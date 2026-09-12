import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT_CN, FONT_MONO } from "../../theme";
import { Terminal, TLine } from "../../components/Terminal";
import { Typewriter } from "../../components/Typewriter";

const CHECKS: { status: "OK" | "BLOCKED"; url: string; note?: string }[] = [
  { status: "OK", url: "iimedia.cn/c400/108129.html" },
  { status: "OK", url: "fxbaogao.com/detail/5229969" },
  { status: "OK", url: "news.cn/ent/20251230/9b41cf89…" },
  { status: "OK", url: "jjckb.cn/20260207/f799547c…" },
  {
    status: "BLOCKED",
    url: "questmobile.com.cn/…",
    note: "反爬拦截，请人工确认",
  },
  { status: "OK", url: "cbndata.com/information/294947" },
  { status: "OK", url: "caifuhao.eastmoney.com/news/2026…" },
  { status: "OK", url: "jiemian.com/article/13860682.html" },
];
// 与横版 v2 相同节拍
const LINE_START = (i: number) => 56 + i * 11;

// S5 竖版 · 溯源与核查（双栏改上下堆叠）
export const S5TraceV: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springIn = (t: number) =>
    t < 0 ? 0 : spring({ frame: t, fps, config: { damping: 18, stiffness: 120, mass: 0.9 } });

  const glow1 = interpolate(frame, [58, 64, 72], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glow2 = interpolate(frame, [69, 75, 83], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        fontFamily: FONT_CN,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: 1000 }}>
        {/* 上：来源清单 */}
        <div
          style={{
            color: C.dim,
            fontSize: 20,
            marginBottom: 18,
            opacity: interpolate(frame, [8, 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          来源清单 · examples/market-research-sample.md
        </div>
        {[
          {
            idx: "[1]",
            title: "艾媒咨询《2025年中国微短剧市场消费调查数据》",
            host: "iimedia.cn",
            glow: glow1,
            delay: 14,
          },
          {
            idx: "[2]",
            title: "DataEye研究院《2025年微短剧行业数据报告》",
            host: "fxbaogao.com",
            glow: glow2,
            delay: 26,
          },
        ].map((e) => {
          const s = springIn(frame - e.delay);
          return (
            <div
              key={e.idx}
              style={{
                background: C.panel,
                border: `1px solid ${e.glow > 0.02 ? C.green : C.border}`,
                borderRadius: 12,
                padding: "16px 22px",
                marginBottom: 14,
                opacity: s,
                translate: `0 ${(1 - s) * 16}px`,
                boxShadow: e.glow > 0 ? `0 0 ${e.glow * 30}px rgba(63,185,80,0.4)` : "none",
              }}
            >
              <span
                style={{ fontFamily: FONT_MONO, color: C.amber, fontSize: 21, marginRight: 12 }}
              >
                {e.idx}
              </span>
              <span style={{ fontSize: 22, color: C.text }}>{e.title}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 17, color: C.dim, marginLeft: 14 }}>
                {e.host}
              </span>
              <span
                style={{
                  color: C.dim,
                  fontSize: 22,
                  marginLeft: 14,
                  opacity: interpolate(frame, [36, 44], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                {e.idx === "[2]" ? "……" : ""}
              </span>
            </div>
          );
        })}

        {/* 下：链接核查终端 */}
        <Terminal
          width={1000}
          title="check_links.py — 报告.md"
          style={{ marginTop: 10 }}
          bodyStyle={{ fontSize: 20, lineHeight: "36px", padding: "20px 24px" }}
        >
          <TLine from={8} text="$ python scripts/check_links.py 报告.md" color={C.term} framesPerChar={1.0} height={36} />
          <TLine
            from={44}
            text="共 8 个链接，开始核查（超时 15.0s，并发 8）..."
            color={C.dim}
            framesPerChar={0.7}
            height={36}
          />
          {CHECKS.map((c, i) => (
            <div key={i} style={{ height: 36, display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 6,
                  flexShrink: 0,
                  background: c.status === "OK" ? C.green : C.amber,
                  opacity: frame >= LINE_START(i) ? 1 : 0,
                }}
              />
              <Typewriter
                text={
                  c.status === "OK"
                    ? `OK    HTTP 200  ${c.url}`
                    : `BLOCKED HTTP 403  ${c.url}（${c.note}）`
                }
                startFrame={LINE_START(i)}
                framesPerChar={0.3}
                cursorColor="transparent"
                style={{ fontSize: 20, color: c.status === "OK" ? C.text : C.amber }}
              />
            </div>
          ))}
          <TLine
            from={148}
            text="汇总：7 可达，1 反爬拦截，0 失效"
            color={C.green}
            framesPerChar={1}
            height={36}
          />
        </Terminal>
      </div>
    </AbsoluteFill>
  );
};
