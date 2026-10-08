"use client";

import { MotionConfig } from "motion/react";
import { PlayerProvider } from "@/components/player-context";
import { MiniPlayer } from "@/components/mini-player";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <PlayerProvider>
        {children}
        <MiniPlayer />
      </PlayerProvider>
    </MotionConfig>
  );
}
