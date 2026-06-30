import type { CSSProperties } from "react";

type GoldenConfettiProps = {
  active?: boolean;
  count?: number;
};

export default function GoldenConfetti({
  active = true,
  count = 18,
}: GoldenConfettiProps) {
  return (
    <div className={active ? "golden-confetti active" : "golden-confetti"} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          style={
            {
              "--confetti-i": index,
              "--confetti-left": `${8 + ((index * 17) % 82)}%`,
              "--confetti-delay": `${(index % 6) * 0.12}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
