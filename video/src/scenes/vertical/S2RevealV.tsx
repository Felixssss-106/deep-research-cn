import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT_CN, FONT_MONO } from "../../theme";
import { Logo } from "../../components/Logo";
import { Badge } from "../../components/Badge";

const TITLE = "deep-research-cn";

// S2 竖版 · 产品揭示
export const S2RevealV: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springIn = (t: number) =>
    t < 0 ? 0 : spring({ frame: t, fps, config: { damping: 18, stiffness: 120, mass: 0.9 } });

  const iconS = springIn(frame - 4);

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_CN,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ opacity: iconS, translate: `${(1 - iconS) * -70}px 0`, marginBottom: 22 }}>
          <Logo size={120} />
        </div>

        <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 66, display: "flex" }}>
          {TITLE.split("").map((ch, i) => {
            const s = springIn(frame - (14 + i * 1.5));
            return (
              <span
                key={i}
                style={{
                  color: C.text,
                  opacity: s,
                  translate: `0 ${(1 - s) * 22}px`,
                  whiteSpace: "pre",
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 22,
            fontSize: 27,
            color: C.dim,
            opacity: interpolate(frame, [56, 68], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: `0 ${interpolate(frame, [56, 68], [14, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}px`,
          }}
        >
          装进 AI 编程助手的中文深度调研技能
        </div>

        <div style={{ marginTop: 48, display: "flex", gap: 20 }}>
          <Badge delay={78} style={{ fontSize: 21, padding: "8px 20px" }}>
            多源检索
          </Badge>
          <Badge delay={84} color={C.amber} style={{ fontSize: 21, padding: "8px 20px" }}>
            口径标注
          </Badge>
          <Badge delay={90} style={{ fontSize: 21, padding: "8px 20px" }}>
            编号来源
          </Badge>
        </div>
      </div>
    </AbsoluteFill>
  );
};
