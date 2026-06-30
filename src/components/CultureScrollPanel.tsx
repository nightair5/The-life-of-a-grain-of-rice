import { motion } from "framer-motion";

type CultureScrollPanelProps = {
  lines: string[];
  insight: string;
};

export default function CultureScrollPanel({
  lines,
  insight,
}: CultureScrollPanelProps) {
  return (
    <motion.div
      className="culture-scroll-panel"
      initial={{ opacity: 0, scaleY: 0.86 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.74, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="ink-rice-line" aria-hidden="true" />
      <span className="culture-gold-thread" aria-hidden="true" />
      {lines.map((line, index) => (
        <motion.p
          key={line}
          className={index === 1 ? "culture-line emphasized" : "culture-line"}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.28 + index * 0.14,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line}
        </motion.p>
      ))}
      <motion.p
        className="culture-insight"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
      >
        {insight}
      </motion.p>
    </motion.div>
  );
}
