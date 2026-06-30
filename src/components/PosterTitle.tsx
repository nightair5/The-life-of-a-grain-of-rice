import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { PosterTitleLine } from "../data/pages";

type PosterTitleProps = {
  id: string;
  lines: PosterTitleLine[];
};

export default function PosterTitle({ id, lines }: PosterTitleProps) {
  return (
    <motion.h1
      id={id}
      className="poster-title"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {lines.map((line) => (
        <motion.span
          key={line.text}
          className="poster-title-line"
          style={{ "--line-indent": `${line.indent ?? 0}px` } as CSSProperties}
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          {line.text}
        </motion.span>
      ))}
    </motion.h1>
  );
}
