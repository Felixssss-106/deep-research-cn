import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { S1Hook } from "./scenes/S1Hook";
import { S2Reveal } from "./scenes/S2Reveal";
import { S3Pipeline } from "./scenes/S3Pipeline";
import { S4Caliber } from "./scenes/S4Caliber";
import { S5Trace } from "./scenes/S5Trace";
import { S6CTA } from "./scenes/S6CTA";

// 旁白音轨：edge-tts 生成的六句解说（public/narration/），
// 每景时长 = 旁白实测时长 + 入场与读秒余量（1200 → 1185 帧 ≈ 39.5s）
const Vo: React.FC<{ name: string; from?: number }> = ({ name, from = 6 }) => (
  <Sequence from={from} layout="none">
    <Audio src={staticFile(`narration/${name}.wav`)} />
  </Sequence>
);

// 统一转场节奏：类 iOS 临界阻尼弹簧，18 帧交叉淡化，无硬切。
// 注意：①不要用 blur-slide 等 WebGL 着色器转场——无头渲染环境会整帧变黑；
// ②不要用 slide——双景内容居中且底色相同，滑动中点画面近空，fade 交叉淡化才是安全解。
const t = () => springTiming({ config: { damping: 200, stiffness: 120 }, durationInFrames: 18 });
const cross = () => fade();

// 苏打（MiMo-V2.5-TTS）旁白实测：8.80/7.84/7.36/7.52/6.56/9.92s
// 各景 = max(节拍下限, ceil((旁白+1.0s)*30/15)*15)；总长 = 1665 - 5×18 = 1575 帧（52.5s）
export const Main: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={300}>
        <S1Hook />
        <Vo name="s1" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={cross()} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={270}>
        <S2Reveal />
        <Vo name="s2" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={cross()} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={255}>
        <S3Pipeline />
        <Vo name="s3" from={8} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={cross()} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={255}>
        <S4Caliber />
        <Vo name="s4" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={cross()} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={240}>
        <S5Trace />
        <Vo name="s5" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={cross()} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={330}>
        <S6CTA />
        <Vo name="s6" />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
