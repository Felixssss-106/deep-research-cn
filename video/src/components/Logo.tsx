import React from "react";
import { C } from "../theme";

// 极简线性图标：文档 + 放大镜（品牌字标配套）
export const Logo: React.FC<{ size?: number; color?: string }> = ({
  size = 120,
  color = C.green,
}) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    {/* 文档 */}
    <path
      d="M24 12 H58 L74 28 V84 H24 Z"
      stroke={color}
      strokeWidth={4}
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M58 12 V28 H74" stroke={color} strokeWidth={4} strokeLinejoin="round" fill="none" />
    {/* 文本行 */}
    <path d="M34 44 H56" stroke={color} strokeWidth={4} strokeLinecap="round" />
    <path d="M34 56 H50" stroke={color} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
    {/* 放大镜 */}
    <circle cx={58} cy={62} r={13} stroke={color} strokeWidth={4} fill={C.bg} />
    <path d="M68 72 L80 84" stroke={color} strokeWidth={5} strokeLinecap="round" />
  </svg>
);
