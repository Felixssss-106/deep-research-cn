# Changelog

本项目的所有重要变更都记录在此文件中。
格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [0.1.0] - 2026-09-11

### Added
- `SKILL.md`：六步中文深度调研管线（定题拆解 → 多源检索 → 交叉验证 → 数据成表 → 结构化成稿 → 来源清单）
- `references/`：多平台检索路由、交叉验证与口径标注规则、沙箱无直连网络降级策略
- `templates/`：市场调研 / 竞品分析 / 技术选型三份报告模板
- `examples/`：基于真实公开数据的样例报告（中国微短剧市场）
- `scripts/check_links.py`：报告来源链接批量核查工具（纯标准库）
- CI：markdownlint + 死链检查
