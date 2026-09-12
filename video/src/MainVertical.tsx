import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { S1HookV } from "./scenes/vertical/S1HookV";
import { S2RevealV } from "./scenes/vertical/S2RevealV";
import { S3PipelineV } from "./scenes/vertical/S3PipelineV";
import { S4CaliberV } from "./scenes/vertical/S4CaliberV";
import { S5TraceV } from "./scenes/vertical/S5TraceV";
import { S6CTAV } from "./scenes/vertical/S6CTAV";

// 竖版主时间线（1080×1920）：分镜时长随苏打旁白重新测算（1575 帧 = 52.5s）
const Vo: React.FC<{ name: string; from?: number }> = ({ name, from = 6 }) => (
  <Sequence from={from} layout="none">
    <Audio src={staticFile(`narration/${name}.wav`)} />
  </Sequence>
);

const t = () => springTiming({ config: { damping: 200, stiffness: 120 }, durationInFrames: 18 });

export const MainVertical: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={300}>
        <S1HookV />
        <Vo name="s1" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={270}>
        <S2RevealV />
        <Vo name="s2" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={255}>
        <S3PipelineV />
        <Vo name="s3" from={8} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={255}>
        <S4CaliberV />
        <Vo name="s4" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={240}>
        <S5TraceV />
        <Vo name="s5" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={330}>
        <S6CTAV />
        <Vo name="s6" />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
