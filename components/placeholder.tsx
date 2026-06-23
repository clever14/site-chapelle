// components/placeholder.tsx
// Image placeholder rayée beige avec légende monospace.
// À remplacer par les vraies photos (WebP) une fois disponibles.

export default function Placeholder({
  label,
  className = "",
  rounded = "rounded-card",
}: {
  label?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`placeholder-rayed flex items-center justify-center overflow-hidden border border-bord-2 ${rounded} ${className}`}
      role="img"
      aria-label={label ?? "Image à venir"}
    >
      {label && (
        <span className="px-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-mono">
          {label}
        </span>
      )}
    </div>
  );
}
