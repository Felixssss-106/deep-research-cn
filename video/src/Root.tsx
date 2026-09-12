import React from "react";
import { Composition, Folder } from "remotion";
import { loadFont as loadNotoSansSC } from "@remotion/google-fonts/NotoSansSC";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { Main } from "./Main";
import { S1Hook } from "./scenes/S1Hook";
import { S2Reveal } from "./scenes/S2Reveal";
import { S3Pipeline } from "./scenes/S3Pipeline";
import { S4Caliber } from "./scenes/S4Caliber";
import { S5Trace } from "./scenes/S5Trace";
import { S6CTA } from "./scenes/S6CTA";
import { Cover } from "./scenes/Cover";

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
    </>
  );
};
