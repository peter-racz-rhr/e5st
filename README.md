# E5vös StudenTalk

One-page Hungarian website for the Eötvös student podcast. Demo build: all text, episodes and segments are placeholders.

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Where things live

| What | File |
| --- | --- |
| Colors, fonts, radius (design tokens) | `src/app/globals.css` |
| All demo text: episodes, segments, story, contacts | `src/lib/data.ts` |
| Hero: wordmark, typewriter, join-the-team email field | `src/components/hero.tsx` |
| Newest episodes, sideways scroll | `src/components/episode-row.tsx` |
| Segments (rovatok), expanding cards | `src/components/segments.tsx`, `src/components/ui/expand-cards.tsx` |
| Contacts | `src/components/contact.tsx` |
| About us, timeline | `src/components/about.tsx`, `src/components/ui/timeline.tsx` |
| Floating mini player | `src/components/mini-player.tsx`, `src/components/player-context.tsx` |

## Not wired up yet

- **Audio:** the player simulates playback on a timer. Real episodes come once we have the RSS feed.
- **Join emails:** the gooey email field only shows a thank-you message; nothing is sent or stored yet.
- **Contacts:** Instagram handle and email address are placeholders.
