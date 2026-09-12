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
import { Typewriter } from "../../components/Typewriter";
import { CrossIcon } from "../../components/Stamp";

// S1 竖版 · 痛点钩子（1080×1920，时间轴与横版一致）
export const S1HookV: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springIn = (t: number) =>
    t < 0 ? 0 : spring({ frame: t, fps, config: { damping: 18, stiffness: 120, mass: 0.9 } });

  const cardS = springIn(frame - 92);
  const row1S = springIn(frame - 118);
  const mark1T = frame - 136;
  const shake1 =
    mark1T > 0 && mark1T < 12 ? Math.sin(mark1T * 3) * 2 * (1 - mark1T / 12) : 0;
  const row2S = springIn(frame - 150);
  const strikeW = interpolate(frame, [164, 176], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const badge2T = frame - 174;

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_CN,
      }}
    >
      <div
        style={{
          width: 900,
          background: C.panel,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: "22px 28px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 32,
        }}
      >
        <span style={{ fontFamily: FONT_MONO, color: C.term, fontSize: 26 }}>$</span>
        <Typewriter
          text="帮我调研一下微短剧市场"
          startFrame={10}
          framesPerChar={7.5}
          style={{ fontSize: 30, color: C.text }}
        />
      </div>

      <div
        style={{
          width: 900,
          background: C.panel,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: "26px 30px",
          opacity: cardS,
          translate: `0 ${(1 - cardS) * 36}px`,
        }}
      >
        <div style={{ color: C.dim, fontSize: 18, marginBottom: 16 }}>AI 回答</div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 14,
            opacity: row1S,
            translate: `${shake1}px ${(1 - row1S) * 18}px`,
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 28, color: C.text }}>2025 年市场规模约 800 亿元</span>
          {mark1T >= 0 ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 12px",
                borderRadius: 8,
                border: `1.5px solid ${C.red}`,
                color: C.red,
                fontSize: 20,
                opacity: interpolate(mark1T, [0, 6], [0, 1], { extrapolateRight: "clamp" }),
                scale: `${interpolate(mark1T, [0, 8], [1.4, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.cubic),
                })}`,
              }}
            >
              <CrossIcon size={18} />
              来源不明
            </span>
          ) : null}
        </div>

        <div
          style={{
            position: "relative",
            fontFamily: FONT_MONO,
            fontSize: 22,
            color: C.dim,
            opacity: row2S,
            translate: `0 ${(1 - row2S) * 18}px`,
          }}
        >
          [1] https://fake-source.example.com
          <div
            style={{
              position: "absolute",
              left: 53,
              top: "50%",
              height: 3,
              width: `${strikeW * 4.2}px`,
              background: C.red,
              borderRadius: 2,
            }}
          />
          {badge2T >= 0 ? (
            <span
              style={{
                marginLeft: 16,
                padding: "4px 12px",
                borderRadius: 8,
                border: `1.5px solid ${C.red}`,
                color: C.red,
                fontFamily: FONT_MONO,
                fontSize: 19,
                display: "inline-flex",
                opacity: interpolate(badge2T, [0, 6], [0, 1], { extrapolateRight: "clamp" }),
                scale: `${interpolate(badge2T, [0, 8], [1.4, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.cubic),
                })}`,
              }}
            >
              404
            </span>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};
