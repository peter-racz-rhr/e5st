// Demo content. Replace with the real episodes (from the RSS feed), segments and story.

export const SPOTIFY_SHOW_URL =
  "https://open.spotify.com/show/2El9cQ7QqPYlDDnfJZNoeJ";

export type Segment = {
  id: string;
  name: string;
  tagline: string;
  description: string;
};

export type Episode = {
  number: number;
  title: string;
  segmentId: Segment["id"];
  date: string; // ISO date
  durationSec: number;
  summary: string;
};

export const segments: Segment[] = [
  {
    id: "tanari",
    name: "Tanári szoba",
    tagline: "Tanárok, katedra nélkül",
    description:
      "Leültetünk egy tanárt, és mindenről kérdezzük, csak a tananyagról nem. Kiderül, ki volt rossz diák, és ki zenélt egy punkzenekarban.",
  },
  {
    id: "erettsegi",
    name: "Érettségi túlélőkalauz",
    tagline: "Tippek azoktól, akik már túlélték",
    description:
      "Végzősök és friss egyetemisták mesélik el, mi működött a felkészülésben, és mi volt teljesen felesleges.",
  },
  {
    id: "vitakor",
    name: "Vitakör",
    tagline: "Két diák, egy kérdés, nulla egyetértés",
    description:
      "Egy megosztó téma, két ellentétes vélemény és tizenöt perc. A végén a hallgatók szavaznak Instagramon.",
  },
  {
    id: "folyoso",
    name: "Folyosói hírek",
    tagline: "Ami a suliban történt",
    description:
      "Táborok, versenyek, bálok és minden pletyka, ami igaz. Röviden, havonta egyszer.",
  },
  {
    id: "oregdiak",
    name: "Öregdiák",
    tagline: "Akik innen indultak",
    description:
      "Volt eötvösösök mesélnek arról, hová jutottak, és mit vinnének magukkal, ha újra itt ülnének.",
  },
];

export const episodes: Episode[] = [
  {
    number: 12,
    title: "Mit csinál egy igazgató szombaton?",
    segmentId: "tanari",
    date: "2026-09-30",
    durationSec: 34 * 60 + 12,
    summary: "Kertészkedés, futás és egy titkos hobbi, amire senki nem számított.",
  },
  {
    number: 11,
    title: "Hogyan ne pánikolj a próbaérettségin",
    segmentId: "erettsegi",
    date: "2026-09-16",
    durationSec: 28 * 60 + 40,
    summary: "Három végzős elmondja, mit csinálnának másképp az utolsó két hétben.",
  },
  {
    number: 10,
    title: "Mobiltilalom: jó ötlet vagy sem?",
    segmentId: "vitakor",
    date: "2026-09-02",
    durationSec: 41 * 60 + 5,
    summary: "Az idei év legforróbb témája, két teljesen ellentétes nézőpontból.",
  },
  {
    number: 9,
    title: "Gólyatábor, ahogy mi láttuk",
    segmentId: "folyoso",
    date: "2026-06-20",
    durationSec: 22 * 60 + 18,
    summary: "Esős napok, éjszakai akadályverseny és az első barátságok.",
  },
  {
    number: 8,
    title: "Öregdiákunk Tokióból jelentkezik",
    segmentId: "oregdiak",
    date: "2026-05-28",
    durationSec: 37 * 60 + 50,
    summary: "Robotmérnök lett, és szerinte minden a fizikaszakkörön kezdődött.",
  },
  {
    number: 7,
    title: "A matektanár, aki hétvégén DJ",
    segmentId: "tanari",
    date: "2026-05-12",
    durationSec: 30 * 60 + 2,
    summary: "Deriválás hétköznap, techno szombat éjjel.",
  },
];

export const segmentById = (id: string) =>
  segments.find((s) => s.id === id) ?? segments[0];

export const episodesForSegment = (id: string) =>
  episodes.filter((e) => e.segmentId === id);

export const contacts = [
  { label: "Spotify", value: "Kövess minket", href: SPOTIFY_SHOW_URL },
  { label: "Apple Podcasts", value: "Hamarosan", href: null },
  { label: "YouTube", value: "Hamarosan", href: null },
  { label: "Instagram", value: "@e5vos.studentalk", href: "https://instagram.com/" },
  { label: "Email", value: "studentalk@e5vos.hu", href: "mailto:studentalk@e5vos.hu" },
] as const;

export const story = [
  {
    year: "2024",
    title: "Egy mikrofon és egy szertár",
    text: "Két tizedikes kölcsönkért egy mikrofont a médiaszakkörtől, és a fizikaszertárban felvették az első beszélgetést. Tizenegy percig tartott, és háromszor kellett újrakezdeni, mert becsöngettek.",
    facts: ["Első adás: november", "2 műsorvezető", "1 mikrofon"],
  },
  {
    year: "2025",
    title: "Lettek rovataink",
    text: "A tanárinterjúk annyira népszerűek lettek, hogy saját rovatot kaptak. Utána jött a Vitakör és az érettségis sorozat, és a csapat nyolc főre nőtt.",
    facts: ["5 rovat", "8 csapattag", "Első 1000 hallgatás"],
  },
  {
    year: "2026",
    title: "Saját stúdió, új hangok",
    text: "Az iskola adott egy kis termet a könyvtár mellett. Most már van rendes hangszigetelés, két mikrofon, és helyünk is: új riportereket, vágókat és ötletgazdákat keresünk.",
    facts: ["Saját stúdió", "Kéthetente új rész", "Te jössz?"],
  },
];

export function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
