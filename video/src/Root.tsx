import React from "react";
import { Composition, Folder } from "remotion";
import { loadFont as loadNotoSansSC } from "@remotion/google-fonts/NotoSansSC";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { Main } from "./Main";
import { MainVertical } from "./MainVertical";
import { S1Hook } from "./scenes/S1Hook";
import { S2Reveal } from "./scenes/S2Reveal";
import { S3Pipeline } from "./scenes/S3Pipeline";
import { S4Caliber } from "./scenes/S4Caliber";
import { S5Trace } from "./scenes/S5Trace";
import { S6CTA } from "./scenes/S6CTA";
import { Cover } from "./scenes/Cover";
import { S1HookV } from "./scenes/vertical/S1HookV";
import { S2RevealV } from "./scenes/vertical/S2RevealV";
import { S3PipelineV } from "./scenes/vertical/S3PipelineV";
import { S4CaliberV } from "./scenes/vertical/S4CaliberV";
import { S5TraceV } from "./scenes/vertical/S5TraceV";
import { S6CTAV } from "./scenes/vertical/S6CTAV";
import { CoverVertical } from "./scenes/vertical/CoverVertical";

// 中文与等宽字体，避免渲染机缺字回退
loadNotoSansSC("normal", { weights: ["400", "500", "700"] });
loadJetBrainsMono("normal", { weights: ["400", "700"], subsets: ["latin"] });

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="分镜">
        <Composition
          id="S1Hook"
          component={S1Hook}
          durationInFrames={240}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="S2Reveal"
          component={S2Reveal}
          durationInFrames={180}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="S3Pipeline"
          component={S3Pipeline}
          durationInFrames={195}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="S4Caliber"
          component={S4Caliber}
          durationInFrames={225}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="S5Trace"
          component={S5Trace}
          durationInFrames={195}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="S6CTA"
          component={S6CTA}
          durationInFrames={240}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Composition
        id="Main"
        component={Main}
        durationInFrames={1185}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Cover"
        component={Cover}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />

      <Folder name="竖版分镜">
        <Composition
          id="S1HookV"
          component={S1HookV}
          durationInFrames={240}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="S2RevealV"
          component={S2RevealV}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="S3PipelineV"
          component={S3PipelineV}
          durationInFrames={195}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="S4CaliberV"
          component={S4CaliberV}
          durationInFrames={225}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="S5TraceV"
          component={S5TraceV}
          durationInFrames={195}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="S6CTAV"
          component={S6CTAV}
          durationInFrames={240}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>

      <Composition
        id="MainVertical"
        component={MainVertical}
        durationInFrames={1185}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CoverVertical"
        component={CoverVertical}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
