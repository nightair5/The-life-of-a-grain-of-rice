import { motion, useReducedMotion } from "framer-motion";
import type { RicePage } from "../data/pages";

type AnimatedSceneProps = {
  page: RicePage;
};

export default function AnimatedScene({ page }: AnimatedSceneProps) {
  const reduceMotion = useReducedMotion();

  const floatTransition = {
    duration: 4.8,
    repeat: reduceMotion ? 0 : Infinity,
    ease: "easeInOut" as const,
  };

  const coreMotion = reduceMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 1, scale: [0.96, 1, 0.98] };

  return (
    <>
      <motion.span
        className="visual-core"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={coreMotion}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {page.sceneLabel}
      </motion.span>

      <motion.span
        className="visual-line visual-line-one"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="visual-line visual-line-two"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />

      {page.visual === "home" ? (
        <motion.span
          className="scene-rice scene-rice-home"
          initial={{ opacity: 0, y: 10, rotate: 34 }}
          animate={{
            opacity: 1,
            y: reduceMotion ? 0 : [-4, 4, -4],
            rotate: reduceMotion ? 38 : [34, 39, 34],
          }}
          transition={floatTransition}
        />
      ) : null}

      {page.visual === "seed" ? (
        <>
          <motion.span
            className="scene-seed-drop"
            initial={{ opacity: 0, y: -54, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          {["one", "two", "three"].map((root, index) => (
            <motion.span
              key={root}
              className={`scene-root root-${root}`}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: `${34 + index * 10}%` }}
              transition={{
                duration: 0.8,
                delay: 0.46 + index * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </>
      ) : null}

      {page.visual === "solar" ? (
        <motion.span
          className="scene-sun"
          initial={{ opacity: 0, scale: 0.76 }}
          animate={{
            opacity: 1,
            scale: reduceMotion ? 1 : [0.96, 1.05, 0.96],
          }}
          transition={floatTransition}
        />
      ) : null}

      {page.visual === "work" ? (
        <div className="seedling-field" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <motion.span
              key={index}
              className="seedling-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.58,
                delay: 0.16 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </div>
      ) : null}

      {page.visual === "harvest" ? (
        <motion.div
          className="harvest-stalk"
          initial={{ opacity: 0, y: 16, rotate: -2 }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: reduceMotion ? 0 : [-2, 2, -2],
          }}
          transition={{
            duration: reduceMotion ? 0.8 : 3.6,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          <span />
          <span />
          <span />
          <span />
        </motion.div>
      ) : null}

      {page.visual === "table" ? (
        <div className="bowl-grains" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -42 - index * 6, x: -18 + index * 9 }}
              animate={{ opacity: 1, y: 0, x: -10 + index * 5 }}
              transition={{
                duration: 0.76,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
