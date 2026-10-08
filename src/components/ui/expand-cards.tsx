"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type ExpandCardItem = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  body: React.ReactNode;
};

// Minimal expanding cards: one card is open at a time and takes the extra
// room. Side by side from md up, stacked on phones.
export function ExpandCards({
  items,
  className,
}: {
  items: ExpandCardItem[];
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.id);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:h-[30rem] md:flex-row",
        className,
      )}
    >
      {items.map((item) => {
        const open = item.id === active;
        return (
          <motion.div
            key={item.id}
            layout
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className={cn(
              "relative overflow-hidden rounded-[var(--radius-media)] border transition-colors",
              open
                ? "border-ink bg-ink text-paper md:flex-[4]"
                : "border-mist bg-surface hover:border-ink/40 md:flex-1",
            )}
          >
            <button
              type="button"
              onClick={() => setActive(item.id)}
              aria-expanded={open}
              aria-controls={`${item.id}-panel`}
              className={cn(
                "flex w-full flex-col items-start p-6 text-left",
                open ? "pb-0" : "h-full",
              )}
            >
              <span
                className={cn(
                  "text-sm",
                  open ? "text-paper/60" : "text-muted",
                )}
              >
                {item.meta}
              </span>
              <span
                className={cn(
                  "mt-2 font-display font-bold leading-tight tracking-tight",
                  open
                    ? "text-3xl md:text-4xl"
                    : "text-2xl md:mt-auto md:rotate-180 md:text-xl md:[writing-mode:vertical-rl]",
                )}
              >
                {item.title}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`${item.id}-panel`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="px-6 pb-6 pt-2 md:max-w-lg">
                    <p className="text-lg text-paper/80">{item.subtitle}</p>
                    <div className="mt-4">{item.body}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
