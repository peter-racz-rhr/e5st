import { Timeline } from "@/components/ui/timeline";
import { SectionHeading } from "@/components/section-heading";
import { story } from "@/lib/data";

export function About() {
  const data = story.map((s) => ({
    title: s.year,
    content: (
      <div className="max-w-xl">
        <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          {s.title}
        </h3>
        <p className="mt-4 text-muted md:text-lg">{s.text}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {s.facts.map((f) => (
            <li
              key={f}
              className="rounded-full border border-mist bg-surface px-3.5 py-1.5 text-sm"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section id="rolunk" className="border-t border-mist pt-20 md:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading
          title="Rólunk"
          lead="Hogyan lett egy szertárban felvett beszélgetésből az iskola podcastja."
        />
      </div>
      <Timeline data={data} />
    </section>
  );
}
