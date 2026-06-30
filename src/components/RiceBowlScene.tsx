import { motion } from "framer-motion";

export default function RiceBowlScene() {
  return (
    <div className="rice-bowl-scene" aria-hidden="true">
      <div className="table-transition-line" />
      <div className="steam-lines">
        <span />
        <span />
        <span />
      </div>
      <div className="falling-rice">
        {Array.from({ length: 12 }, (_, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -88, x: -58 + index * 11 }}
            animate={{ opacity: [0, 1, 1, 0.72], y: 8, x: -32 + index * 6 }}
            transition={{
              duration: 1.04,
              delay: 0.16 + index * 0.075,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}
