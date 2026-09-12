// 深色开发者工具风设计系统（对齐视觉设计文档第 2 节）
export const C = {
  bg: "#0D1117", // GitHub Dark 底色
  bgDeep: "#010409", // 终端窗体内底色
  panel: "#161B22", // 卡片、表格底
  border: "#30363D", // 面板描边 1px
  text: "#E6EDF3", // 主文字
  dim: "#8B949E", // 注释、时间码
  green: "#3FB950", // 通过、可用、品牌主色
  red: "#F85149", // 幻觉、坏链、错误示范
  amber: "#D29922", // 口径标签、引用编号
  term: "#7EE787", // 终端代码文本
} as const;

export const FONT_CN = '"Noto Sans SC", "Microsoft YaHei", sans-serif';
export const FONT_MONO = '"JetBrains Mono", Consolas, monospace';

// easeOutExpo 近似贝塞尔
export const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

// 各分镜帧数（30fps）
export const SCENE_FRAMES = {
  S1: 240,
  S2: 240,
  S3: 480,
  S4: 420,
  S5: 300,
  S6: 240,
} as const;
