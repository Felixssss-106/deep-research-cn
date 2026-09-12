import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT_CN } from "../theme";

const NODES = [
  { num: "①", name: "定题拆解", sub: "拆成 3-6 个子问题" },
  { num: "②", name: "多源检索", sub: "五层信源路由" },
  { num: "③", name: "交叉验证", sub: "≥2 独立来源" },
  { num: "④", name: "数据成表", sub: "口径列+来源编号" },
  { num: "⑤", name: "结构化成稿", sub: "事实与推断分离" },
  { num: "⑥", name: "来源清单", sub: "编号可溯源" },
];
const R = 56;
const Y = 470;
const xs = NODES.map((_, i) => 960 + (i - 2.5) * 268);
// 旁白 5.2s → 195 帧：节点每 24 帧点亮一个，收尾整体脉冲
const activateT = (i: number) => 16 + i * 24;

// S3 · 六步管线（电流逐级点亮，收尾同步脉冲；转场交给 TransitionSeries）
export const S3Pipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 全部点亮后的同步脉冲
  const pulse = interpolate(frame, [158, 164, 170], [1, 0.86, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: FONT_CN }}>
      <AbsoluteFill style={{ opacity: pulse }}>
        {/* 连接线（描画动画） */}
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          {NODES.slice(0, -1).map((_, i) => {
            const x1 = xs[i] + R + 12;
            const x2 = xs[i + 1] - R - 12;
            const len = x2 - x1;
            const t = frame - (activateT(i) + 3);
            const off = interpolate(t, [0, 10], [len, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });
            return (
              <line
                key={i}
                x1={x1}
                y1={Y}
                x2={x2}
                y2={Y}
                stroke={C.green}
                strokeWidth={3}
                strokeDasharray={len}
                strokeDashoffset={Math.max(0, off)}
                opacity={t < 0 ? 0 : 0.9}
              />
            );
          })}
        </svg>

        {NODES.map((n, i) => {
          const t = frame - activateT(i);
          const active = t >= 0;
          const s = active
            ? spring({ frame: t, fps, config: { damping: 16, stiffness: 140, mass: 0.8 } })
            : 0;
          // scale 0.9 → 1.06 → 1.0（弹簧过冲回落）
          const scale = active
            ? interpolate(Math.min(s, 1), [0, 0.5, 1], [0.9, 1.06, 1])
            : 0.9;
          const subT = t - 9;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: xs[i] - 110,
                top: Y - R,
                width: 220,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: active ? 1 : 0.4,
              }}
            >
              <div
                style={{
                  width: R * 2,
                  height: R * 2,
                  borderRadius: R,
                  border: `3px solid ${active ? C.green : C.border}`,
                  background: active ? "rgba(63,185,80,0.10)" : C.panel,
                  boxShadow: active ? `0 0 36px rgba(63,185,80,0.35)` : "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  scale: `${scale}`,
                  fontSize: 44,
                  color: active ? C.text : C.dim,
                }}
              >
                {n.num}
              </div>
              <div
                style={{
                  marginTop: 22,
                  fontSize: 30,
                  fontWeight: 500,
                  color: active ? C.text : C.dim,
                }}
              >
                {n.name}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 21,
                  color: C.dim,
                  opacity: interpolate(subT, [0, 8], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  translate: `0 ${interpolate(subT, [0, 8], [10, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })}px`,
                  whiteSpace: "nowrap",
                }}
              >
                {n.sub}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
