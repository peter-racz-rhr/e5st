import { cn } from "@/lib/utils";

// Placeholder cover art: the episode number set large on ink.
// Replace with the real cover images once they come from the feed.
export function EpisodeCover({
  number,
  className,
  size = "lg",
}: {
  number: number;
  className?: string;
  size?: "sm" | "lg";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative grid place-items-center overflow-hidden bg-ink text-paper",
        size === "lg" ? "rounded-[var(--radius-media)]" : "rounded-xl",
        className,
      )}
    >
      <span
        className={cn(
          "font-display font-bold leading-none tracking-tight",
          size === "lg" ? "text-[7rem]" : "text-2xl",
        )}
      >
        {number}
      </span>
      <span
        className={cn(
          "absolute rounded-full bg-signal",
          size === "lg" ? "right-5 top-5 size-3" : "right-1.5 top-1.5 size-1.5",
        )}
      />
    </div>
  );
}
