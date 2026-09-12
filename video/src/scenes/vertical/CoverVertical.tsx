import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT_CN, FONT_MONO } from "../../theme";

// 竖版封面帧（1080×1920）：上文下数
const STATS = [
  { v: "677.9 亿", tag: "真人微短剧·消费口径" },
  { v: "近 900 亿", tag: "行业产值预估" },
  { v: "约 1000 亿", tag: "微短剧+漫剧综合产值" },
];

export const CoverVertical: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: FONT_CN, overflow: "hidden" }}>
      {/* 底部六步管线水印 */}
      <div
        style={{
          position: "absolute",
          right: -50,
          bottom: 150,
          fontSize: 80,
          color: C.text,
          opacity: 0.06,
          letterSpacing: 16,
          whiteSpace: "nowrap",
        }}
      >
        ①②③④⑤⑥
      </div>

      <div style={{ padding: "300px 100px 0" }}>
        <div style={{ fontSize: 72, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>
          让 AI 学会做调研
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 34, color: C.green, marginTop: 28 }}>
          deep-research-cn
        </div>
        <div style={{ fontSize: 25, color: C.dim, marginTop: 18 }}>
          装进 AI 编程助手的中文深度调研技能
        </div>

        <div style={{ marginTop: 90 }}>
          {STATS.map((s) => (
            <div key={s.v} style={{ marginBottom: 42 }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 44, color: C.text }}>{s.v}</div>
              <div style={{ marginTop: 10 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 16px",
                    borderRadius: 999,
                    border: `1.5px solid ${C.amber}`,
                    color: C.amber,
                    fontSize: 19,
                  }}
                >
                  {s.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 100,
          right: 100,
          bottom: 200,
          height: 3,
          background: C.green,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 100,
          bottom: 148,
          fontFamily: FONT_MONO,
          fontSize: 23,
          color: C.dim,
        }}
      >
        github.com/Felixssss-106/deep-research-cn
      </div>
    </AbsoluteFill>
  );
};
