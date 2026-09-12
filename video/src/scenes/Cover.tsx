import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT_CN, FONT_MONO } from "../theme";

// 封面帧（1280×720）：左文右数（视觉设计文档第 5 节）
const STATS = [
  { v: "677.9 亿", tag: "真人微短剧·消费口径" },
  { v: "近 900 亿", tag: "行业产值预估" },
  { v: "约 1000 亿", tag: "微短剧+漫剧综合产值" },
];

export const Cover: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: FONT_CN, overflow: "hidden" }}>
      {/* 右下角六步管线水印 */}
      <div
        style={{
          position: "absolute",
          right: -40,
          bottom: 60,
          fontSize: 96,
          color: C.text,
          opacity: 0.06,
          letterSpacing: 18,
          whiteSpace: "nowrap",
        }}
      >
        ①②③④⑤⑥
      </div>

      <div style={{ display: "flex", padding: "110px 100px 0", gap: 60 }}>
        {/* 左：文案 */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 78, fontWeight: 700, color: C.text, lineHeight: 1.25 }}>
            让 AI 学会做调研
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 36,
              color: C.green,
              marginTop: 30,
            }}
          >
            deep-research-cn
          </div>
          <div style={{ fontSize: 26, color: C.dim, marginTop: 20 }}>
            装进 AI 编程助手的中文深度调研技能
          </div>
        </div>

        {/* 右：三个口径数字 */}
        <div style={{ width: 400, paddingTop: 14 }}>
          {STATS.map((s) => (
            <div key={s.v} style={{ marginBottom: 34 }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 44, color: C.text }}>
                {s.v}
              </div>
              <div style={{ marginTop: 8 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 14px",
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

      {/* 底部绿线 + URL */}
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 100,
          bottom: 92,
          height: 3,
          background: C.green,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 100,
          bottom: 46,
          fontFamily: FONT_MONO,
          fontSize: 24,
          color: C.dim,
        }}
      >
        github.com/Felixssss-106/deep-research-cn
      </div>
    </AbsoluteFill>
  );
};
