import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT_CN, FONT_MONO } from "../theme";
import { RollingNumber } from "../components/RollingNumber";
import { CaliberTag, Stamp } from "../components/Stamp";

const ROWS = [
  {
    org: "艾媒咨询",
    value: 677.9,
    decimals: 1,
    suffix: " 亿元",
    extra: "（+34.4%）",
    extraColor: C.green,
    tag: "真人微短剧·消费口径",
  },
  {
    org: "中国网络视听协会",
    value: 900,
    decimals: 0,
    prefix: "近 ",
    suffix: " 亿元",
    extra: "（预估）",
    extraColor: C.dim,
    tag: "行业产值预估",
  },
  {
    org: "DataEye",
    value: 1000,
    decimals: 0,
    prefix: "约 ",
    suffix: " 亿元",
    extra: "",
    extraColor: C.dim,
    tag: "微短剧+漫剧综合产值",
  },
];
// 旁白 6.5s → 225 帧：三行快速落位，结论章 f=132 盖下
const ROW_START = [26, 48, 70];

// S4 · 杀手锏：口径标注
export const S4Caliber: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springIn = (t: number) =>
    t < 0 ? 0 : spring({ frame: t, fps, config: { damping: 18, stiffness: 120, mass: 0.9 } });

  const headerS = springIn(frame - 6);

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        fontFamily: FONT_CN,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: 1360 }}>
        {/* 表头 */}
        <div
          style={{
            display: "flex",
            padding: "0 36px",
            marginBottom: 18,
            opacity: headerS,
            translate: `0 ${(1 - headerS) * 12}px`,
            color: C.dim,
            fontSize: 24,
          }}
        >
          <div style={{ width: 300 }}>机构</div>
          <div style={{ width: 470 }}>2025 年市场规模</div>
          <div>口径</div>
        </div>

        {ROWS.map((r, i) => {
          const t = frame - ROW_START[i];
          const s = springIn(t);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                background: C.panel,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "26px 36px",
                marginBottom: 16,
                opacity: s,
                translate: `0 ${(1 - s) * 18}px`,
              }}
            >
              <div style={{ width: 300, fontSize: 32, fontWeight: 500, color: C.text }}>
                {r.org}
              </div>
              <div
                style={{
                  width: 470,
                  fontFamily: FONT_MONO,
                  fontSize: 36,
                  color: C.text,
                  whiteSpace: "nowrap",
                }}
              >
                <RollingNumber
                  value={r.value}
                  startFrame={ROW_START[i] + 4}
                  duration={14}
                  decimals={r.decimals}
                  prefix={r.prefix ?? ""}
                  suffix={r.suffix}
                />
                {r.extra ? (
                  <span
                    style={{
                      fontSize: 24,
                      color: r.extraColor,
                      fontFamily: FONT_CN,
                      marginLeft: 10,
                      opacity: interpolate(t, [12, 20], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    }}
                  >
                    {r.extra}
                  </span>
                ) : null}
              </div>
              <CaliberTag startFrame={ROW_START[i] + 14}>{r.tag}</CaliberTag>
            </div>
          );
        })}

        {/* 印章式结论条 */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 44 }}>
          <Stamp startFrame={132}>
            三个数都对——口径不同。AI 被禁止擅自「仲裁」。
          </Stamp>
        </div>
      </div>
    </AbsoluteFill>
  );
};
