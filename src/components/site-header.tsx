const links = [
  { href: "#epizodok", label: "Epizódok" },
  { href: "#rovatok", label: "Rovatok" },
  { href: "#kapcsolat", label: "Kapcsolat" },
  { href: "#rolunk", label: "Rólunk" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-mist/70 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <a href="#" className="font-display text-lg font-bold tracking-tight">
          E<span className="text-signal">5</span>vös StudenTalk
        </a>
        <nav aria-label="Fő navigáció" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#csatlakozz"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper md:hidden"
        >
          Csatlakozz
        </a>
      </div>
    </header>
  );
}
