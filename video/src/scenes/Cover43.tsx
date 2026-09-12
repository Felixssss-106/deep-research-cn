import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT_CN, FONT_MONO } from "../theme";

// 4:3 封面（1600×1200）：海报式布局——标题居上，三枚口径数字卡片横排压住下半部，
// 底部绿线 + URL；右下角六步管线水印
const STATS = [
  { v: "677.9 亿", tag: "真人微短剧·消费口径" },
  { v: "近 900 亿", tag: "行业产值预估" },
  { v: "约 1000 亿", tag: "微短剧+漫剧综合产值" },
];

export const Cover43: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: FONT_CN, overflow: "hidden" }}>
      {/* 中部留白带的六步管线水印 */}
      <div
        style={{
          position: "absolute",
          right: 130,
          top: 470,
          fontSize: 96,
          color: C.text,
          opacity: 0.06,
          letterSpacing: 20,
          whiteSpace: "nowrap",
        }}
      >
        ①②③④⑤⑥
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "120px 120px 230px",
        }}
      >
        {/* 标题区 */}
        <div>
          <div style={{ fontSize: 96, fontWeight: 700, color: C.text, lineHeight: 1.25 }}>
            让 AI 学会做调研
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 40,
              color: C.green,
              marginTop: 30,
            }}
          >
            deep-research-cn
          </div>
          <div style={{ fontSize: 29, color: C.dim, marginTop: 20 }}>
            装进 AI 编程助手的中文深度调研技能
          </div>
        </div>

        {/* 弹性留白 */}
        <div style={{ flex: 1 }} />

        {/* 三口径数字卡片 */}
        <div style={{ display: "flex", gap: 50 }}>
          {STATS.map((s) => (
            <div
              key={s.v}
              style={{
                flex: 1,
                background: C.panel,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "34px 38px",
              }}
            >
              <div style={{ fontFamily: FONT_MONO, fontSize: 56, color: C.text }}>
                {s.v}
              </div>
              <div style={{ marginTop: 16 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 18px",
                    borderRadius: 999,
                    border: `1.5px solid ${C.amber}`,
                    color: C.amber,
                    fontSize: 22,
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
          left: 120,
          right: 120,
          bottom: 130,
          height: 3,
          background: C.green,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 120,
          bottom: 72,
          fontFamily: FONT_MONO,
          fontSize: 26,
          color: C.dim,
        }}
      >
        github.com/Felixssss-106/deep-research-cn
      </div>
    </AbsoluteFill>
  );
};
