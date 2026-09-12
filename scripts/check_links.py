#!/usr/bin/env python3
"""check_links.py — 批量核查 Markdown 报告中来源链接的可达性。

用法：
    python check_links.py 报告.md [更多.md ...]
    python check_links.py --timeout 10 --workers 8 examples/*.md

行为：
- 提取文件中所有 http(s) 链接并去重；
- 并发发起 GET 请求（部分站点拒绝 HEAD）；
- 2xx/3xx 视为可达；403/405/429 视为"反爬拦截"（需人工确认，不算失败）；
  其余视为失效；
- 任一链接失效时退出码为 1，方便接入 CI。

安全边界（本工具会请求报告中的任意 URL，因此做了硬性限制）：
- 仅允许 http/https 协议；
- 解析目标主机，拒绝私网、环回、链路本地、保留及组播地址（防 SSRF/内网探测）；
- 重定向手动逐跳处理（最多 5 跳），每一跳的目标都重新过上述校验。

仅依赖 Python 标准库。
"""

from __future__ import annotations

import argparse
import concurrent.futures
import ipaddress
import re
import socket
import sys
import urllib.error
import urllib.request

URL_RE = re.compile(r"https?://[^\s<>\"']+")
# URL 末尾常见的句子标点，属正文而非链接
TRAILING_PUNCT = ".,;:!?\u3002\uff0c\uff1b\uff1a\uff01\uff1f\u3001"
MAX_REDIRECTS = 5
USER_AGENT = "Mozilla/5.0 (compatible; deep-research-cn link check)"


def _blocked_ip(ip: ipaddress.IPv4Address | ipaddress.IPv6Address) -> bool:
    return (
        ip.is_private
        or ip.is_loopback
        or ip.is_link_local
        or ip.is_reserved
        or ip.is_multicast
        or ip.is_unspecified
    )


def validate_url(url: str) -> str:
    """校验协议与解析后的 IP，返回用于请求的 URL；不合规则抛 ValueError。"""
    parsed = urllib.request.urlparse(url)
    if parsed.scheme not in ("http", "https"):
        raise ValueError(f"仅允许 http/https 协议，拒绝 {parsed.scheme or '空'} 协议")
    host = parsed.hostname
    if not host:
        raise ValueError("URL 缺少主机名")
    infos = socket.getaddrinfo(host, parsed.port or (443 if parsed.scheme == "https" else 80),
                               type=socket.SOCK_STREAM)
    for info in infos:
        ip = ipaddress.ip_address(info[4][0])
        if _blocked_ip(ip):
            raise ValueError(f"目标解析到受限地址 {ip}（私网/环回/保留地址），已拦截")
    return url


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    """禁用自动重定向，改由外层手动逐跳处理并重新校验。"""

    def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: ANN001
        return None


_OPENER = urllib.request.build_opener(_NoRedirect)


def _fetch_once(url: str, timeout: float) -> tuple[int, str | None]:
    """请求一次，返回 (状态码, 重定向目标)。非重定向错误直接抛异常。"""
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT}, method="GET")
    try:
        with _OPENER.open(req, timeout=timeout) as resp:
            resp.read(1024)  # 触发真实请求，读取少量字节即可
            return resp.getcode(), None
    except urllib.error.HTTPError as e:
        if 300 <= e.code < 400:
            return e.code, e.headers.get("Location")
        raise


def check(url: str, timeout: float) -> tuple[str, str, str]:
    """返回 (url, 状态标记, 说明)。标记为 OK / BLOCKED / DEAD。"""
    try:
        current = validate_url(url)
    except (ValueError, socket.gaierror) as e:
        return url, "DEAD", f"URL 校验拒绝: {e}"

    try:
        for _ in range(MAX_REDIRECTS + 1):
            code, location = _fetch_once(current, timeout)
            if location is None:
                return url, "OK", f"HTTP {code}"
            if not location:
                return url, "DEAD", "重定向缺少 Location"
            current = urllib.request.urljoin(current, location)
            validate_url(current)  # 逐跳重新校验，防重定向跳进内网
        return url, "DEAD", f"重定向超过 {MAX_REDIRECTS} 跳"
    except urllib.error.HTTPError as e:
        if e.code in (403, 405, 429):
            return url, "BLOCKED", f"HTTP {e.code}（反爬拦截，请人工确认）"
        return url, "DEAD", f"HTTP {e.code}"
    except (ValueError, socket.gaierror) as e:
        return url, "DEAD", f"目标被安全校验拦截: {e}"
    except Exception as e:  # 超时、DNS 失败、连接拒绝等
        return url, "DEAD", f"{type(e).__name__}: {e}"


def extract_urls(text: str) -> list[str]:
    urls: list[str] = []
    seen: set[str] = set()
    for match in URL_RE.findall(text):
        url = match.rstrip(TRAILING_PUNCT)
        # Markdown 链接 [x](url) 的右括号：URL 内无配对左括号时剥掉
        while url.endswith(")") and url.count("(") < url.count(")"):
            url = url[:-1]
        if url and url not in seen:
            seen.add(url)
            urls.append(url)
    return urls


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("files", nargs="+", help="要核查的 Markdown 文件")
    parser.add_argument("--timeout", type=float, default=15.0, help="单请求超时秒数（默认 15）")
    parser.add_argument("--workers", type=int, default=8, help="并发数（默认 8）")
    args = parser.parse_args()

    urls: list[str] = []
    seen: set[str] = set()
    for path in args.files:
        try:
            with open(path, encoding="utf-8") as f:
                text = f.read()
        except OSError as e:
            print(f"无法读取 {path}: {e}", file=sys.stderr)
            return 2
        for url in extract_urls(text):
            if url not in seen:
                seen.add(url)
                urls.append(url)

    if not urls:
        print("未发现任何链接。")
        return 0

    print(f"共 {len(urls)} 个链接，开始核查（超时 {args.timeout}s，并发 {args.workers}）...\n")
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = [pool.submit(check, url, args.timeout) for url in urls]
        for future in concurrent.futures.as_completed(futures):
            results.append(future.result())

    order = {"OK": 0, "BLOCKED": 1, "DEAD": 2}
    results.sort(key=lambda r: (order[r[1]], r[0]))
    for url, status, note in results:
        mark = {"OK": "✅", "BLOCKED": "⚠️ ", "DEAD": "❌"}[status]
        print(f"{mark} {status:<7} {note:<40} {url}")

    dead = [r for r in results if r[1] == "DEAD"]
    blocked = [r for r in results if r[1] == "BLOCKED"]
    print(f"\n汇总：{len(results) - len(dead) - len(blocked)} 可达，"
          f"{len(blocked)} 反爬拦截（人工确认），{len(dead)} 失效。")
    return 1 if dead else 0


if __name__ == "__main__":
    sys.exit(main())
