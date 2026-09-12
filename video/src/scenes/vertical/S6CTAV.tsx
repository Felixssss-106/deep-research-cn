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
import { Terminal, TLine } from "../../components/Terminal";
import { Logo } from "../../components/Logo";
import { Badge } from "../../components/Badge";

// S6 竖版 · 安装与 CTA（节拍与横版 v2 一致）
export const S6CTAV: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springIn = (t: number) =>
    t < 0 ? 0 : spring({ frame: t, fps, config: { damping: 18, stiffness: 120, mass: 0.9 } });

  const cardS = springIn(frame - 64);

  const topDim = interpolate(frame, [116, 134], [1, 0.32], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const coverS = springIn(frame - 120);
  const barW = interpolate(frame, [144, 156], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const urlO = interpolate(frame, [154, 164], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fade = interpolate(frame, [226, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const breath = 1 + 0.008 * Math.sin(frame / 7);

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        fontFamily: FONT_CN,
        alignItems: "center",
        opacity: fade,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 620,
          scale: `${breath}`,
          transformOrigin: "50% 55%",
        }}
      >
        <div style={{ opacity: topDim, translate: `0 ${(1 - topDim) * -20}px` }}>
          <Terminal width={1000} title="install" bodyStyle={{ fontSize: 22 }}>
            <TLine
              from={8}
              text="$ git clone https://github.com/Felixssss-106/deep-research-cn"
              color={C.term}
              framesPerChar={0.9}
            />
          </Terminal>

          <div
            style={{
              width: 1000,
              background: C.panel,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: "22px 30px",
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 22,
              opacity: cardS,
              translate: `0 ${(1 - cardS) * 36}px`,
            }}
          >
            <Logo size={56} />
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 26, color: C.text }}>
                Felixssss-106 / deep-research-cn
              </div>
              <div style={{ fontSize: 21, color: C.dim, marginTop: 8 }}>
                装进 AI 编程助手的中文深度调研技能
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 20, marginTop: 26, justifyContent: "center" }}>
            <Badge delay={92} style={{ fontSize: 21, padding: "8px 20px" }}>
              MIT 开源
            </Badge>
            <Badge delay={97} style={{ fontSize: 21, padding: "8px 20px" }}>
              零依赖
            </Badge>
            <Badge delay={102} style={{ fontSize: 21, padding: "8px 20px" }}>
              零 API Key
            </Badge>
          </div>
        </div>

        <div
          style={{
            marginTop: 110,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: coverS,
            translate: `0 ${(1 - coverS) * 30}px`,
          }}
        >
          <div style={{ fontSize: 42, fontWeight: 700, color: C.text, textAlign: "center" }}>
            让每一个关键结论，都能被独立验证。
          </div>
          <div
            style={{
              width: `${barW * 1.8}px`,
              height: 4,
              background: C.green,
              borderRadius: 2,
              marginTop: 26,
            }}
          />
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              color: C.dim,
              marginTop: 26,
              opacity: urlO,
            }}
          >
            github.com/Felixssss-106/deep-research-cn
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
