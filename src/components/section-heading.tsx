export function SectionHeading({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-xl">
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h2>
        {lead && <p className="mt-3 text-muted">{lead}</p>}
      </div>
      {children}
    </div>
  );
}
