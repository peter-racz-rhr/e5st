"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ExternalLink,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  X,
} from "lucide-react";
import { usePlayer } from "@/components/player-context";
import { EpisodeCover } from "@/components/episode-cover";
import { SPOTIFY_SHOW_URL, formatDuration, segmentById } from "@/lib/data";

// Floating player: appears on first play, keeps going while you scroll,
// can be dragged anywhere and folded into a small bubble.
export function MiniPlayer() {
  const { episode, playing, position, toggle, seek, skip, close } = usePlayer();
  const [minimized, setMinimized] = useState(false);
  const bounds = useRef<HTMLDivElement>(null);

  const progress = episode ? position / episode.durationSec : 0;

  return (
    <div ref={bounds} className="pointer-events-none fixed inset-3 z-50 sm:inset-6">
      <AnimatePresence>
        {episode && (
          <motion.div
            key="player"
            drag
            dragConstraints={bounds}
            dragMomentum={false}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="pointer-events-auto absolute bottom-0 right-0 cursor-grab touch-none active:cursor-grabbing"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 420, damping: 36 }}
              className="overflow-hidden border border-mist bg-surface/85 shadow-[0_24px_60px_-20px_rgba(23,26,43,0.35)] backdrop-blur-xl"
              style={{ borderRadius: minimized ? 999 : 24 }}
            >
              {minimized ? (
                <button
                  type="button"
                  onClick={() => setMinimized(false)}
                  aria-label={`Lejátszó megnyitása: ${episode.title}`}
                  className="grid size-14 place-items-center"
                >
                  <Bars playing={playing} />
                </button>
              ) : (
                <div className="w-[min(22rem,calc(100vw-1.5rem))] p-3">
                  <div className="flex items-center gap-3">
                    <EpisodeCover
                      number={episode.number}
                      size="sm"
                      className="size-12 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {episode.title}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {segmentById(episode.segmentId).name}
                      </p>
                    </div>
                    <IconButton label="Lejátszó kicsinyítése" onClick={() => setMinimized(true)}>
                      <Minimize2 className="size-4" />
                    </IconButton>
                    <IconButton label="Lejátszó bezárása" onClick={close}>
                      <X className="size-4" />
                    </IconButton>
                  </div>

                  <div className="mt-3">
                    <input
                      type="range"
                      min={0}
                      max={episode.durationSec}
                      value={position}
                      onChange={(e) => seek(Number(e.target.value))}
                      onPointerDownCapture={(e) => e.stopPropagation()}
                      aria-label="Lejátszási pozíció"
                      className="h-1 w-full cursor-pointer appearance-none rounded-full bg-mist accent-signal"
                      style={{
                        background: `linear-gradient(to right, var(--color-signal) ${progress * 100}%, var(--color-mist) ${progress * 100}%)`,
                      }}
                    />
                    <div className="mt-1 flex justify-between text-[11px] tabular-nums text-muted">
                      <span>{formatDuration(position)}</span>
                      <span>-{formatDuration(episode.durationSec - position)}</span>
                    </div>
                  </div>

                  <div className="mt-1 flex items-center justify-between">
                    <a
                      href={SPOTIFY_SHOW_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs text-muted transition-colors hover:text-ink"
                    >
                      <ExternalLink className="size-3.5" />
                      Spotify
                    </a>
                    <div className="flex items-center gap-1">
                      <IconButton label="Vissza 15 másodpercet" onClick={() => skip(-15)}>
                        <RotateCcw className="size-4" />
                      </IconButton>
                      <button
                        type="button"
                        onClick={toggle}
                        aria-label={playing ? "Szünet" : "Lejátszás"}
                        className="grid size-10 place-items-center rounded-full bg-ink text-paper transition-transform active:scale-95"
                      >
                        {playing ? (
                          <Pause className="size-4" fill="currentColor" />
                        ) : (
                          <Play className="ml-0.5 size-4" fill="currentColor" />
                        )}
                      </button>
                      <IconButton label="Előre 15 másodpercet" onClick={() => skip(15)}>
                        <RotateCw className="size-4" />
                      </IconButton>
                    </div>
                    <span className="w-[4.5rem]" />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-paper hover:text-ink"
    >
      {children}
    </button>
  );
}

function Bars({ playing }: { playing: boolean }) {
  return (
    <span className="flex h-5 items-end gap-[3px]" aria-hidden>
      {[0.6, 1, 0.75, 0.45].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-signal"
          animate={
            playing
              ? { height: ["30%", `${h * 100}%`, "40%", `${h * 80}%`, "30%"] }
              : { height: "30%" }
          }
          transition={
            playing
              ? { duration: 1.1, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        />
      ))}
    </span>
  );
}
