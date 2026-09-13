# deep-research-cn 🇨🇳🔍

**给 AI 编程助手（ZCode / Claude Code / Cursor 等）用的中文深度调研技能。**

它把"帮我全网查一下"从一句容易产生幻觉的提示，变成一条**可复现的调研管线**：
多源检索 → 交叉验证 → 口径标注 → 数据成表 → 带编号来源清单的成稿。

[English](#english)｜[样例报告](examples/market-research-sample.md)｜[更新日志](CHANGELOG.md)

![License](https://img.shields.io/badge/license-MIT-green)

## 为什么需要它

直接让 AI"调研一个市场"，典型产出是：数字来源不明、不同口径混着比、链接是编的。
本技能把三个最痛的问题制度化地解决：

| 痛点 | 本技能的做法 |
|------|-------------|
| 数字凭空出现 | 关键数字必须 ≥2 个独立来源，或明确标注"单一来源" |
| 口径混战（"千亿"vs"678 亿"到底哪个对？） | 强制口径标注 + 冲突时并列呈现、禁止擅自仲裁 |
| 来源无法回溯 | 文末编号来源清单 + 附带链接可达性核查脚本 |

## 快速开始

### ZCode

把本仓库克隆到用户技能目录：

```bash
git clone https://github.com/<you>/deep-research-cn ~/.agents/skills/deep-research-cn
```

之后对 ZCode 说"**帮我调研一下 XX 市场**"即可触发。

### Claude Code

```bash
git clone https://github.com/<you>/deep-research-cn ~/.claude/skills/deep-research-cn
```

### 其他 Agent（Cursor / Codex CLI / 任意支持 SKILL.md 的客户端）

本技能只是一组 Markdown + 一个纯标准库 Python 脚本，没有运行时依赖：
把仓库放到你的 agent 读取技能的目录，或在系统提示中引用 `SKILL.md` 内容即可。

## 它如何工作

```
① 定题拆解    明确范围/产出类型/读者，拆成 3-6 个可检索子问题
② 多源检索    官方权威 → 研究机构 → 主流媒体 → 社区 → 英文源，五层路由
③ 交叉验证    独立来源 ≥2；口径冲突并列呈现，禁止擅自仲裁
④ 数据成表    数字进表格，带口径列与来源编号
⑤ 结构化成稿  三份模板：市场调研 / 竞品分析 / 技术选型
⑥ 来源清单    编号引用 + check_links.py 批量核查链接
```

一个真实效果（节选自[样例报告](examples/market-research-sample.md)）：

> **同一指标、三个口径，注意区分：**
>
> | 机构 | 2025 年市场规模 | 口径说明 |
> |------|---------------|---------|
> | 艾媒咨询 | 677.9 亿元（+34.4%） | 真人微短剧，消费口径 |
> | 中国网络视听协会 | 近 900 亿元（预估） | 行业全年产值 |
> | DataEye | 约 1000 亿元 | 微短剧+漫剧综合产值，含平台投资 |

——这就是本技能想达到的样子：**不告诉你"哪个数是对的"，而是告诉你每个数在什么口径下成立。**

## 目录结构

```
deep-research-cn/
├── SKILL.md                  # 技能入口：六步管线
├── references/
│   ├── search-routing.md     # 信息源五层分层 + 查询策略
│   ├── verification.md       # 交叉验证 / 口径标注 / 反编造纪律
│   └── sandbox-notes.md      # 受限网络/沙箱的降级策略
├── templates/                # 市场调研 / 竞品分析 / 技术选型
├── examples/                 # 真实数据样例报告
└── scripts/check_links.py    # 来源链接批量核查（纯标准库）
```

## 链接核查脚本

```bash
python scripts/check_links.py 报告.md
# ✅ OK / ⚠️ 反爬拦截（人工确认）/ 🟡 NET 未能核实 / ❌ 失效（仅此类计入退出码 1）
```

内置 SSRF 防护：仅允许 http/https、拦截私网/环回地址、重定向逐跳校验。

## FAQ

**Q：和直接用 ChatGPT/Gemini 的 Deep Research 有什么区别？**
A：闭源 Deep Research 是黑盒，本技能是一条**你完全可见、可改**的管线——你可以往
`references/` 里加自己行业的信源（如医疗加丁香园、电商加久谦），让调研质量随你的领域积累复利。

**Q：需要联网吗？需要 API key 吗？**
A：技能本身零依赖、零密钥。检索能力来自你 agent 已有的工具（内置搜索、MCP 检索服务等）。
沙箱（无直连或仅部分连通）也有降级路径（见 `references/sandbox-notes.md`）。

**Q：产出质量怎么保证？**
A：质量规则全部写在 `references/verification.md`（独立来源、口径标注、反编造纪律），
并且 agent 被明确要求"查不到就写未找到公开数据，不许编"。

## Roadmap

- [ ] 更多行业信源分层样例（医疗 / 电商 / 游戏）
- [ ] 英文版 SKILL（deep-research-en）
- [ ] check_links.py 支持输出 SARIF 供 CI 展示

欢迎 issue / PR。

## English

**deep-research-cn** is a [SKILL.md](SKILL.md)-based skill that gives AI coding agents
a reproducible Chinese-market deep-research pipeline: multi-source retrieval with a
five-tier source hierarchy, cross-validation with strict methodology (口径/scoping)
annotation, tabulated data with numbered source lists, and a stdlib-only link checker
with built-in SSRF protection. Drop the repo into your agent's skills directory and
ask it to "调研" anything in Chinese. MIT licensed.

## License

[MIT](LICENSE)
