import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { EpisodeRow } from "@/components/episode-row";
import { Segments } from "@/components/segments";
import { Contact } from "@/components/contact";
import { About } from "@/components/about";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <EpisodeRow />
        <Segments />
        <Contact />
        <About />
      </main>
      <footer className="border-t border-mist">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:px-8">
          <p>
            E<span className="text-signal">5</span>vös StudenTalk, az Eötvös diákpodcastja
          </p>
          <a href="#csatlakozz" className="hover:text-ink">
            Csatlakoznál a csapathoz?
          </a>
        </div>
      </footer>
    </>
  );
}
