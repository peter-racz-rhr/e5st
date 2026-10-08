import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "E5vös StudenTalk",
  description:
    "Az Eötvös diákpodcastja: tanárok, diákok és minden, amiről a folyosón beszélünk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={`${bricolage.variable} ${instrument.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
