import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useState } from "react";
import type { SolarTerm } from "../data/pages";

type SolarTermTimelineProps = {
  terms: SolarTerm[];
};

const iconLabel: Record<SolarTerm["icon"], string> = {
  rain: "雨",
  grain: "穗",
  seed: "种",
  dew: "露",
  sun: "日",
};

export default function SolarTermTimeline({ terms }: SolarTermTimelineProps) {
  const [activeTerm, setActiveTerm] = useState(0);
  const active = terms[activeTerm];

  return (
    <section className="solar-timeline" aria-label="节气时间轴">
      <div className={`solar-season-aura aura-${active.icon}`} aria-hidden="true" />
      <motion.div
        className="timeline-line"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
      <motion.div
        key={`icon-${active.name}`}
        className={`solar-icon icon-${active.icon}`}
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        {iconLabel[active.icon]}
      </motion.div>
      <div className="solar-chip-list">
        {terms.map((term, index) => {
          const side = index % 2 === 0 ? "left" : "right";

          return (
            <motion.button
              key={term.name}
              className={[
                "solar-chip",
                `solar-chip-${side}`,
                index === activeTerm ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              onClick={() => setActiveTerm(index)}
              style={{ "--term-index": index } as CSSProperties}
              initial={{ opacity: 0, x: side === "left" ? -14 : 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.48,
                delay: 0.18 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span>{term.name}</span>
              <small>{term.note}</small>
            </motion.button>
          );
        })}
      </div>
      <motion.p
        key={`note-${active.name}`}
        className="solar-term-note"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {active.name} · {active.note}
      </motion.p>
    </section>
  );
}
