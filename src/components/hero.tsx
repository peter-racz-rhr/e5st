"use client";

import { motion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GooeyInput } from "@/components/ui/gooey-input";
import { EpisodeCover } from "@/components/episode-cover";
import { usePlayer } from "@/components/player-context";
import { episodes, formatDuration, segmentById } from "@/lib/data";

const wordmark = ["E", "5", "v", "ö", "s"];

const recruitLine = [
  { text: "Keresünk:" },
  { text: "hangokat," },
  { text: "ötleteket," },
  { text: "téged." },
];

export function Hero() {
  const latest = episodes[0];
  const { episode, playing, play } = usePlayer();
  const latestPlaying = episode?.number === latest.number && playing;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20">
      <p className="text-muted">Az Eötvös diákpodcastja, kéthetente új résszel.</p>

      <h1 className="mt-4 font-display font-bold leading-[0.82] tracking-[-0.045em]">
        <span className="sr-only">E5vös StudenTalk</span>
        <span aria-hidden className="block text-[clamp(5rem,26vw,18rem)]">
          {wordmark.map((ch, i) => (
            <motion.span
              key={i}
              className={ch === "5" ? "inline-block text-signal" : "inline-block"}
              initial={{ y: "0.35em", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08 * i, type: "spring", stiffness: 220, damping: 22 }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
        <motion.span
          aria-hidden
          className="block text-[clamp(2.75rem,13vw,9rem)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          StudenTalk
        </motion.span>
      </h1>

      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div id="csatlakozz" className="scroll-mt-24">
          <TypewriterEffect
            words={recruitLine}
            className="font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
            cursorClassName="h-7 md:h-9 lg:h-11"
          />
          <p className="mt-4 max-w-md text-muted">
            Riportereket, vágókat és ötletgazdákat keresünk bármelyik évfolyamról.
            Írd be az email-címed, és megkeresünk.
          </p>
          <GooeyInput
            className="mt-6"
            placeholder="te@email.hu"
            buttonLabel="Jelentkezem"
            successText="Megkaptuk. Hamarosan írunk."
          />
        </div>

        <div className="border-t border-mist pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <p className="text-sm text-muted">Legújabb rész</p>
          <div className="mt-3 flex items-center gap-4">
            <EpisodeCover number={latest.number} size="sm" className="size-16 shrink-0" />
            <div className="min-w-0">
              <p className="font-semibold leading-snug">{latest.title}</p>
              <p className="mt-0.5 text-sm text-muted">
                {segmentById(latest.segmentId).name}, {formatDuration(latest.durationSec)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => play(latest)}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            {latestPlaying ? (
              <Pause className="size-4" fill="currentColor" />
            ) : (
              <Play className="size-4" fill="currentColor" />
            )}
            {latestPlaying ? "Szünet" : "Meghallgatom"}
          </button>
        </div>
      </div>
    </section>
  );
}
