# Changelog

本项目的所有重要变更都记录在此文件中。
格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Fixed
- `references/sandbox-notes.md`：网络探测不再假设存在 `curl`（补 `wget` / `python3` 兜底命令）；
  区分“完全无网”与“部分连通”两种受限形态；Reader 类服务改为“需先探测”的备选通道
  （部分网络中不可达，如被 DNS 污染、连接超时）。
- `scripts/check_links.py`：区分“未能核实（NET）”与“明确失效（DEAD）”；
  NET 不再按失效计、不影响退出码，避免受限网络下把连接超时误报为死链。

### Changed
- `SKILL.md` / `README.md`：同步以上调整的表述。

## [0.1.0] - 2026-09-11

### Added
- `SKILL.md`：六步中文深度调研管线（定题拆解 → 多源检索 → 交叉验证 → 数据成表 → 结构化成稿 → 来源清单）
- `references/`：多平台检索路由、交叉验证与口径标注规则、沙箱无直连网络降级策略
- `templates/`：市场调研 / 竞品分析 / 技术选型三份报告模板
- `examples/`：基于真实公开数据的样例报告（中国微短剧市场）
- `scripts/check_links.py`：报告来源链接批量核查工具（纯标准库）
- CI：markdownlint + 死链检查
