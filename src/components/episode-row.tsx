"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { EpisodeCover } from "@/components/episode-cover";
import { SectionHeading } from "@/components/section-heading";
import { usePlayer } from "@/components/player-context";
import {
  episodes,
  formatDate,
  formatDuration,
  segmentById,
  type Episode,
} from "@/lib/data";

export function EpisodeRow() {
  const scroller = useRef<HTMLUListElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section id="epizodok" className="border-t border-mist py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading
          title="Legújabb epizódok"
          lead="Görgess oldalra, és indítsd el bármelyiket. A lejátszó veled marad, amíg böngészel."
        >
          <div className="hidden gap-2 md:flex">
            <ArrowButton label="Előző epizódok" onClick={() => scrollBy(-1)}>
              <ChevronLeft className="size-5" />
            </ArrowButton>
            <ArrowButton label="Következő epizódok" onClick={() => scrollBy(1)}>
              <ChevronRight className="size-5" />
            </ArrowButton>
          </div>
        </SectionHeading>
      </div>

      <ul
        ref={scroller}
        className="no-scrollbar row-gutter mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {episodes.map((ep) => (
          <li key={ep.number} className="w-[72vw] shrink-0 snap-start sm:w-72">
            <EpisodeCard episode={ep} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function EpisodeCard({ episode }: { episode: Episode }) {
  const { episode: current, playing, play } = usePlayer();
  const isPlaying = current?.number === episode.number && playing;

  return (
    <article className="group">
      <div className="relative">
        <EpisodeCover number={episode.number} className="aspect-square w-full" />
        <button
          type="button"
          onClick={() => play(episode)}
          aria-label={`${isPlaying ? "Szünet" : "Lejátszás"}: ${episode.title}`}
          className="absolute bottom-4 right-4 grid size-12 place-items-center rounded-full bg-paper text-ink shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <Pause className="size-5" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 size-5" fill="currentColor" />
          )}
        </button>
      </div>
      <p className="mt-4 text-sm text-signal">{segmentById(episode.segmentId).name}</p>
      <h3 className="mt-1 text-lg font-semibold leading-snug">{episode.title}</h3>
      <p className="mt-2 text-sm text-muted">{episode.summary}</p>
      <p className="mt-3 text-xs tabular-nums text-muted">
        {formatDate(episode.date)}, {formatDuration(episode.durationSec)}
      </p>
    </article>
  );
}

function ArrowButton({
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
      className="grid size-11 place-items-center rounded-full border border-mist bg-surface transition-colors hover:border-ink"
    >
      {children}
    </button>
  );
}
