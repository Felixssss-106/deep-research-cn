import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT_CN, FONT_MONO } from "../theme";
import { Terminal, TLine } from "../components/Terminal";
import { Typewriter } from "../components/Typewriter";

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
// 旁白 5.2s → 195 帧：结果行每 11 帧一条，快速流式输出，汇总行留足停留
const LINE_START = (i: number) => 56 + i * 11;

// S5 · 溯源与核查（左清单与右终端节奏互锁）
export const S5Trace: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springIn = (t: number) =>
    t < 0 ? 0 : spring({ frame: t, fps, config: { damping: 18, stiffness: 120, mass: 0.9 } });

  // 对应行打印时左侧来源条目亮一下
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
      <div style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
        {/* 左：来源清单 */}
        <div style={{ width: 700, paddingTop: 26 }}>
          <div
            style={{
              color: C.dim,
              fontSize: 22,
              marginBottom: 24,
              opacity: interpolate(frame, [10, 20], [0, 1], {
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
                  position: "relative",
                  background: C.panel,
                  border: `1px solid ${e.glow > 0.02 ? C.green : C.border}`,
                  borderRadius: 12,
                  padding: "22px 26px",
                  marginBottom: 18,
                  opacity: s,
                  translate: `0 ${(1 - s) * 16}px`,
                  boxShadow: e.glow > 0 ? `0 0 ${e.glow * 30}px rgba(63,185,80,0.4)` : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    color: C.amber,
                    fontSize: 24,
                    marginRight: 12,
                  }}
                >
                  {e.idx}
                </span>
                <span style={{ fontSize: 25, color: C.text }}>{e.title}</span>
                <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: C.dim, marginTop: 8 }}>
                  {e.host}
                </div>
              </div>
            );
          })}
          <div
            style={{
              color: C.dim,
              fontSize: 28,
              opacity: interpolate(frame, [36, 44], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            ……
          </div>
        </div>

        {/* 右：真实运行的链接核查 */}
        <Terminal width={920} title="check_links.py — 报告.md">
          <TLine from={8} text="$ python scripts/check_links.py 报告.md" color={C.term} framesPerChar={1.0} />
          <TLine
            from={44}
            text="共 8 个链接，开始核查（超时 15.0s，并发 8）..."
            color={C.dim}
            framesPerChar={0.7}
          />
          {CHECKS.map((c, i) => (
            <div key={i} style={{ height: 42, display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  width: 12,
                  height: 12,
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
                style={{ fontSize: 22, color: c.status === "OK" ? C.text : C.amber }}
              />
            </div>
          ))}
          <TLine
            from={148}
            text="汇总：7 可达，1 反爬拦截，0 失效"
            color={C.green}
            framesPerChar={1}
          />
        </Terminal>
      </div>
    </AbsoluteFill>
  );
};
