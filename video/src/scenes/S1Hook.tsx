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
import { Typewriter } from "../components/Typewriter";
import { CrossIcon } from "../components/Stamp";

// S1 · 痛点钩子（旁白 7.2s → 240 帧）
export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // iOS 弹簧：轻微回弹入场
  const springIn = (t: number) =>
    t < 0 ? 0 : spring({ frame: t, fps, config: { damping: 18, stiffness: 120, mass: 0.9 } });

  const cardS = springIn(frame - 92);

  // 行 1：数字声明 f=118，红色标注 f=136 + 抖动
  const row1S = springIn(frame - 118);
  const mark1T = frame - 136;
  const shake1 =
    mark1T > 0 && mark1T < 12 ? Math.sin(mark1T * 3) * 2 * (1 - mark1T / 12) : 0;

  // 行 2：链接 f=150，红线划过 f=164，404 角标 f=174
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
      {/* 提问输入框 */}
      <div
        style={{
          width: 940,
          background: C.panel,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 36,
        }}
      >
        <span style={{ fontFamily: FONT_MONO, color: C.term, fontSize: 30 }}>$</span>
        <Typewriter
          text="帮我调研一下微短剧市场"
          startFrame={10}
          framesPerChar={7.5}
          style={{ fontSize: 34, color: C.text }}
        />
      </div>

      {/* AI 回答卡片 */}
      <div
        style={{
          width: 940,
          background: C.panel,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: "30px 36px",
          opacity: cardS,
          translate: `0 ${(1 - cardS) * 36}px`,
        }}
      >
        <div style={{ color: C.dim, fontSize: 20, marginBottom: 18 }}>AI 回答</div>

        {/* 行 1：来源不明的数字 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: row1S,
            translate: `${shake1}px ${(1 - row1S) * 18}px`,
            marginBottom: 22,
          }}
        >
          <span style={{ fontSize: 32, color: C.text }}>
            2025 年市场规模约 800 亿元
          </span>
          {mark1T >= 0 ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 8,
                border: `1.5px solid ${C.red}`,
                color: C.red,
                fontSize: 22,
                opacity: interpolate(mark1T, [0, 6], [0, 1], {
                  extrapolateRight: "clamp",
                }),
                scale: `${interpolate(mark1T, [0, 8], [1.4, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.cubic),
                })}`,
              }}
            >
              <CrossIcon size={20} />
              来源不明
            </span>
          ) : null}
        </div>

        {/* 行 2：失效链接 */}
        <div
          style={{
            position: "relative",
            fontFamily: FONT_MONO,
            fontSize: 26,
            color: C.dim,
            opacity: row2S,
            translate: `0 ${(1 - row2S) * 18}px`,
          }}
        >
          [1] https://fake-source.example.com
          {/* 红色划线 */}
          <div
            style={{
              position: "absolute",
              left: "52px",
              top: "50%",
              height: 3,
              width: `${strikeW * 5.6}px`,
              background: C.red,
              borderRadius: 2,
            }}
          />
          {badge2T >= 0 ? (
            <span
              style={{
                marginLeft: 20,
                padding: "4px 14px",
                borderRadius: 8,
                border: `1.5px solid ${C.red}`,
                color: C.red,
                fontFamily: FONT_MONO,
                fontSize: 22,
                display: "inline-flex",
                opacity: interpolate(badge2T, [0, 6], [0, 1], {
                  extrapolateRight: "clamp",
                }),
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
