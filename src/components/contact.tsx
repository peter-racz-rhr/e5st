import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { contacts } from "@/lib/data";

export function Contact() {
  return (
    <section id="kapcsolat" className="border-t border-mist py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-8 md:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading
            title="Kapcsolat"
            lead="Témaötleted van, vendéget ajánlanál, vagy csak írnál nekünk? Itt elérsz minket, és itt hallgathatsz is."
          />
        </div>
        <ul className="border-t border-ink">
          {contacts.map((c) => (
            <li key={c.label} className="border-b border-mist">
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-signal"
                >
                  <span className="font-display text-2xl font-semibold tracking-tight">
                    {c.label}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-muted group-hover:text-signal">
                    {c.value}
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              ) : (
                <div className="flex items-center justify-between gap-4 py-5 text-muted">
                  <span className="font-display text-2xl font-semibold tracking-tight">
                    {c.label}
                  </span>
                  <span className="text-sm">{c.value}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
