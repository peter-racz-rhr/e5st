"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Episode } from "@/lib/data";

// Demo playback: there are no audio files yet, so time advances on a timer.
// Swap this for an <audio> element once episodes come from the RSS feed.

type PlayerState = {
  episode: Episode | null;
  playing: boolean;
  position: number;
  play: (episode: Episode) => void;
  toggle: () => void;
  seek: (sec: number) => void;
  skip: (delta: number) => void;
  close: () => void;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (!playing || !episode) return;
    const id = window.setInterval(() => {
      setPosition((p) => {
        if (p + 1 >= episode.durationSec) {
          setPlaying(false);
          return episode.durationSec;
        }
        return p + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing, episode]);

  const play = useCallback(
    (next: Episode) => {
      if (episode?.number === next.number) {
        setPlaying((p) => !p);
        return;
      }
      setEpisode(next);
      setPosition(0);
      setPlaying(true);
    },
    [episode],
  );

  const toggle = useCallback(() => setPlaying((p) => !p), []);

  const seek = useCallback(
    (sec: number) => {
      if (!episode) return;
      setPosition(Math.min(Math.max(0, sec), episode.durationSec));
    },
    [episode],
  );

  const skip = useCallback(
    (delta: number) => seek(position + delta),
    [seek, position],
  );

  const close = useCallback(() => {
    setPlaying(false);
    setEpisode(null);
    setPosition(0);
  }, []);

  const value = useMemo(
    () => ({ episode, playing, position, play, toggle, seek, skip, close }),
    [episode, playing, position, play, toggle, seek, skip, close],
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}
