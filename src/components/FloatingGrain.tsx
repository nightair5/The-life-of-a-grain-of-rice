import type { CSSProperties } from "react";

type FloatingGrainProps = {
  count?: number;
  variant?: "light" | "gold" | "mist";
};

export default function FloatingGrain({
  count = 10,
  variant = "gold",
}: FloatingGrainProps) {
  return (
    <div className={`floating-grain grain-${variant}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          style={
            {
              "--grain-left": `${9 + ((index * 23) % 82)}%`,
              "--grain-top": `${8 + ((index * 31) % 78)}%`,
              "--grain-delay": `${(index % 7) * 0.36}s`,
              "--grain-duration": `${4.4 + (index % 5) * 0.62}s`,
              "--grain-size": `${7 + (index % 4) * 2}px`,
              "--grain-rotate": `${-26 + (index % 8) * 9}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
