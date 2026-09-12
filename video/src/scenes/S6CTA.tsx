import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT_CN, FONT_MONO } from "../theme";
import { Terminal, TLine } from "../components/Terminal";
import { Logo } from "../components/Logo";
import { Badge } from "../components/Badge";

// S6 · 安装与 CTA（旁白 7.0s → 240 帧，结尾淡出收束全片）
export const S6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springIn = (t: number) =>
    t < 0 ? 0 : spring({ frame: t, fps, config: { damping: 18, stiffness: 120, mass: 0.9 } });

  // 仓库卡片 spring 入场
  const cardS = springIn(frame - 64);

  // 定格封面构图：上方内容压暗，结语浮现
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

  // 结尾淡出至黑（全片收束；S6 已扩到 330 帧，淡出窗口随之前移）
  const fade = interpolate(frame, [316, 330], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // 定格呼吸
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
          paddingTop: 96,
          scale: `${breath}`,
          transformOrigin: "50% 55%",
        }}
      >
        {/* 克隆命令 + 仓库卡片 */}
        <div style={{ opacity: topDim, translate: `0 ${(1 - topDim) * -20}px` }}>
          <Terminal width={1160} title="install">
            <TLine
              from={8}
              text="$ git clone https://github.com/Felixssss-106/deep-research-cn"
              color={C.term}
              framesPerChar={0.9}
            />
          </Terminal>

          <div
            style={{
              width: 1160,
              background: C.panel,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: "26px 34px",
              marginTop: 26,
              display: "flex",
              alignItems: "center",
              gap: 24,
              opacity: cardS,
              translate: `0 ${(1 - cardS) * 36}px`,
            }}
          >
            <Logo size={64} />
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 30, color: C.text }}>
                Felixssss-106 / deep-research-cn
              </div>
              <div style={{ fontSize: 23, color: C.dim, marginTop: 8 }}>
                装进 AI 编程助手的中文深度调研技能
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 24, marginTop: 30, justifyContent: "center" }}>
            <Badge delay={92}>MIT 开源</Badge>
            <Badge delay={97}>零依赖</Badge>
            <Badge delay={102}>零 API Key</Badge>
          </div>
        </div>

        {/* 定格结语 */}
        <div
          style={{
            marginTop: 92,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: coverS,
            translate: `0 ${(1 - coverS) * 30}px`,
          }}
        >
          <div style={{ fontSize: 52, fontWeight: 700, color: C.text, textAlign: "center" }}>
            让每一个关键结论，都能被独立验证。
          </div>
          <div
            style={{
              width: `${barW * 1.8}px`,
              height: 4,
              background: C.green,
              borderRadius: 2,
              marginTop: 30,
            }}
          />
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 26,
              color: C.dim,
              marginTop: 28,
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
