"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { ArrowUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email field whose send button sits melted into the pill and pulls away
// as a liquid drop once the address is valid. The goo is an SVG blur +
// alpha threshold applied to the background shapes only, so text stays sharp.
export function GooeyInput({
  placeholder,
  buttonLabel,
  successText,
  onSubmit,
  className,
}: {
  placeholder: string;
  buttonLabel: string;
  successText: string;
  onSubmit?: (email: string) => void;
  className?: string;
}) {
  const filterId = useId().replace(/:/g, "");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const valid = EMAIL.test(email.trim());
  const apart = valid && !sent;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || sent) return;
    onSubmit?.(email.trim());
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative h-14 w-full max-w-md rounded-full focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-signal",
        className,
      )}
    >
      <svg aria-hidden className="absolute size-0">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        aria-hidden
        className="absolute inset-0"
        style={{ filter: `url(#${filterId})` }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-ink"
          animate={{ right: apart ? 68 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        />
        <motion.div
          className="absolute right-1 top-1 size-12 rounded-full bg-signal"
          animate={{ scale: apart ? 1.08 : sent ? 1 : 0.82 }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
        />
      </div>

      {sent ? (
        <p
          role="status"
          className="relative flex h-full items-center pl-6 pr-20 text-sm font-medium text-paper"
        >
          {successText}
        </p>
      ) : (
        <>
          <label htmlFor={`${filterId}-email`} className="sr-only">
            Email-cím
          </label>
          <input
            id={`${filterId}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="relative h-full w-full rounded-full bg-transparent pl-6 pr-20 text-[15px] text-paper placeholder:text-paper/50 focus:outline-none focus-visible:outline-none"
          />
        </>
      )}

      <button
        type="submit"
        disabled={!valid || sent}
        aria-label={buttonLabel}
        className="absolute right-1 top-1 grid size-12 place-items-center rounded-full text-paper transition-opacity disabled:cursor-not-allowed"
      >
        {sent ? (
          <Check className="size-5" />
        ) : (
          <ArrowUp
            className={cn("size-5 transition-transform", valid ? "rotate-45" : "rotate-0 opacity-70")}
          />
        )}
      </button>
    </form>
  );
}
