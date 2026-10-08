"use client";

import { Pause, Play } from "lucide-react";
import { ExpandCards } from "@/components/ui/expand-cards";
import { SectionHeading } from "@/components/section-heading";
import { usePlayer } from "@/components/player-context";
import { episodesForSegment, formatDuration, segments } from "@/lib/data";

export function Segments() {
  const { episode: current, playing, play } = usePlayer();

  const items = segments.map((seg) => {
    const eps = episodesForSegment(seg.id);
    return {
      id: seg.id,
      title: seg.name,
      subtitle: seg.tagline,
      meta: `${eps.length} epizód`,
      body: (
        <>
          <p className="text-paper/70">{seg.description}</p>
          {eps.length > 0 && (
            <ul className="mt-5 divide-y divide-paper/15 border-y border-paper/15">
              {eps.map((ep) => {
                const isPlaying = current?.number === ep.number && playing;
                return (
                  <li key={ep.number}>
                    <button
                      type="button"
                      onClick={() => play(ep)}
                      className="flex w-full items-center gap-3 py-3 text-left text-sm"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-paper text-ink">
                        {isPlaying ? (
                          <Pause className="size-3.5" fill="currentColor" />
                        ) : (
                          <Play className="ml-0.5 size-3.5" fill="currentColor" />
                        )}
                      </span>
                      <span className="flex-1">{ep.title}</span>
                      <span className="tabular-nums text-paper/60">
                        {formatDuration(ep.durationSec)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      ),
    };
  });

  return (
    <section id="rovatok" className="border-t border-mist py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading
          title="Rovatok"
          lead="Öt visszatérő műsor, öt különböző hangulat. Nyiss ki egyet, és nézd meg, miről szól."
        />
        <ExpandCards items={items} className="mt-10" />
      </div>
    </section>
  );
}
