import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useState } from "react";

type SeedGrowthSceneProps = {
  onComplete?: () => void;
};

export default function SeedGrowthScene({ onComplete }: SeedGrowthSceneProps) {
  const [growthKey, setGrowthKey] = useState(0);
  const [hasGrown, setHasGrown] = useState(false);

  const handleGrow = () => {
    setGrowthKey((key) => key + 1);
    setHasGrown(true);
    window.setTimeout(() => {
      onComplete?.();
    }, 1180);
  };

  return (
    <button
      className={hasGrown ? "seed-growth-scene grown" : "seed-growth-scene"}
      type="button"
      onClick={handleGrow}
      aria-label="轻点种子，让根系生长"
    >
      <motion.span
        key={`seed-${growthKey}`}
        className="seed-orb"
        initial={{ opacity: 0, y: -44, scale: 0.84 }}
        animate={
          hasGrown
            ? { opacity: 1, y: 55, scale: 0.9 }
            : { opacity: 1, y: [0, -9, 0], scale: [1, 1.03, 1] }
        }
        transition={
          hasGrown
            ? { duration: 0.62, ease: [0.22, 1, 0.36, 1] }
            : { duration: 2.9, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <span className="seed-air-glow" aria-hidden="true" />
      <div className="seed-ritual-orbit" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="seed-weather-layer" aria-hidden="true">
        <span className="seed-weather-rain">雨</span>
        <span className="seed-weather-soil">土</span>
        <span className="seed-weather-light">光</span>
      </div>
      <div className="sowing-seed-rain" aria-hidden="true">
        {Array.from({ length: 7 }, (_, index) => (
          <motion.span
            key={`sowing-${growthKey}-${index}`}
            className="sowing-seed"
            initial={{ opacity: 0, y: -70, rotate: -22 }}
            animate={
              hasGrown
                ? {
                    opacity: [0, 0.92, 0.88, 0],
                    y: [-72, 16, 86, 100],
                    rotate: [-22, -4, 18, 24],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: 1.05,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={
              {
                "--sowing-x": `${-98 + index * 32}px`,
                "--sowing-i": index,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <span className="seed-impact-ripple" aria-hidden="true" />
      <span className="soil-cross-section" aria-hidden="true" />
      <div className="seed-soil-layers" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {hasGrown ? (
        <div className="seed-soil-puffs" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <motion.span
              key={`puff-${growthKey}-${index}`}
              initial={{ opacity: 0, scale: 0.4, y: 0 }}
              animate={{ opacity: [0, 0.72, 0], scale: [0.4, 1.2, 1.8], y: -18 }}
              transition={{
                duration: 0.86,
                delay: 0.26 + index * 0.045,
                ease: "easeOut",
              }}
              style={
                {
                  "--puff-x": `${-92 + index * 26}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      ) : null}
      {hasGrown ? (
        <motion.span
          key={`sprout-${growthKey}`}
          className="seed-first-sprout"
          initial={{ opacity: 0, scaleY: 0, y: 12 }}
          animate={{ opacity: 1, scaleY: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      ) : null}
      {hasGrown
        ? Array.from({ length: 10 }, (_, index) => (
            <motion.span
              key={`root-${growthKey}-${index}`}
              className={`root-line root-line-${index + 1}`}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: 0.94,
                delay: 0.2 + index * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))
        : null}
      {hasGrown
        ? Array.from({ length: 14 }, (_, index) => (
            <motion.span
              key={`spark-${growthKey}-${index}`}
              className="root-spark"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 1.45] }}
              transition={{
                duration: 1.16,
                delay: 0.48 + index * 0.045,
                ease: "easeOut",
              }}
              style={
                {
                  "--spark-x": `${-86 + index * 13}px`,
                  "--spark-y": `${15 + (index % 5) * 12}px`,
                } as CSSProperties
              }
            />
          ))
        : null}
      <div className="seed-micro-grains" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <span className="seed-tap-hint">
        {hasGrown ? "生长，从此开始" : "轻点种子"}
      </span>
    </button>
  );
}
