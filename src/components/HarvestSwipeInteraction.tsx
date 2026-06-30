import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const COMPLETE_PROGRESS = 80;
const SHEAF_COUNT = 21;

type HarvestSwipeInteractionProps = {
  onComplete?: () => void;
};

type DragState = {
  startX: number;
  startY: number;
  isHorizontal: boolean;
};

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 100);
}

export default function HarvestSwipeInteraction({
  onComplete,
}: HarvestSwipeInteractionProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const dragStateRef = useRef<DragState | null>(null);
  const zoneRef = useRef<HTMLDivElement | null>(null);
  const cutCount = Math.floor((progress / 100) * SHEAF_COUNT);
  const deviceClassName = [
    "harvest-device",
    progress > 0 && !isComplete ? "harvesting" : "",
    isComplete ? "complete" : "",
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    if (isComplete) {
      return;
    }

    const timer = window.setTimeout(() => setShowNudge(true), 3000);
    return () => window.clearTimeout(timer);
  }, [isComplete]);

  const updateProgress = (clientX: number, clientY: number) => {
    const dragState = dragStateRef.current;
    const zone = zoneRef.current;

    if (!dragState || !zone || isComplete) {
      return;
    }

    const deltaX = clientX - dragState.startX;
    const deltaY = clientY - dragState.startY;

    if (!dragState.isHorizontal && Math.abs(deltaX) > 12) {
      dragState.isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.25;
    }

    if (!dragState.isHorizontal) {
      return;
    }

    const rect = zone.getBoundingClientRect();
    const nextProgress = clampProgress((deltaX / rect.width) * 112);
    setProgress(nextProgress);

    if (nextProgress >= COMPLETE_PROGRESS) {
      setIsComplete(true);
      setProgress(100);
      onComplete?.();
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isComplete) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setShowNudge(false);
    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      isHorizontal: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    updateProgress(event.clientX, event.clientY);
  };

  const handlePointerEnd = () => {
    if (!isComplete && progress < COMPLETE_PROGRESS) {
      setProgress(0);
    }

    dragStateRef.current = null;
  };

  return (
    <section
      className={deviceClassName}
      aria-label="滑动收割稻穗"
    >
      <div
        ref={zoneRef}
        className="harvest-track"
        role="button"
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        style={{ "--harvest-progress": `${progress}%` } as CSSProperties}
      >
        <div className="harvest-field-depth" aria-hidden="true" />
        <div className="harvest-gesture-line" aria-hidden="true" />
        <div className="harvest-light" aria-hidden="true" />
        <div className="harvest-cut-trail" aria-hidden="true" />
        <div className="harvest-sheaf-line" aria-hidden="true">
          {Array.from({ length: SHEAF_COUNT }, (_, index) => (
            <span
              key={index}
              className={index < cutCount ? "cut" : undefined}
              style={{ "--sheaf-i": index } as CSSProperties}
            />
          ))}
        </div>
        <div className="harvest-fallen-bundle" aria-hidden="true">
          {Array.from({ length: 7 }, (_, index) => (
            <motion.span
              key={index}
              animate={
                isComplete
                  ? { opacity: 1, x: 0, y: 0, rotate: -18 + index * 6 }
                  : { opacity: 0, x: -26, y: -14, rotate: -34 + index * 4 }
              }
              transition={{ duration: 0.56, delay: 0.06 + index * 0.04 }}
            />
          ))}
        </div>
        <div className="harvest-grain-burst" aria-hidden="true">
          {Array.from({ length: 16 }, (_, index) => (
            <motion.span
              key={index}
              animate={
                isComplete
                  ? {
                      opacity: [0, 1, 0],
                      x: [0, 118 - index * 8],
                      y: [0, -46 - (index % 5) * 12],
                    }
                  : { opacity: 0, x: 0, y: 0 }
              }
              transition={{ duration: 0.9, delay: index * 0.025, ease: "easeOut" }}
              style={{ "--grain-i": index } as CSSProperties}
            />
          ))}
        </div>
        <motion.div
          className="sickle-handle"
          aria-hidden="true"
          animate={{ x: `calc(${progress}% - 18px)` }}
          transition={{ type: "spring", stiffness: 180, damping: 25 }}
        >
          <span className="sickle-blade" />
        </motion.div>
        <p className={showNudge ? "harvest-device-tip nudge" : "harvest-device-tip"}>
          {isComplete ? "稻穗已成束" : "按住镰刀，从左向右割下稻穗"}
        </p>
      </div>
      <div className="harvest-basket" aria-hidden="true">
        <i />
        {Array.from({ length: 8 }, (_, index) => (
          <motion.span
            key={index}
            animate={isComplete ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: -28, x: -28 + index * 8 }}
            transition={{ duration: 0.52, delay: index * 0.05 }}
          />
        ))}
      </div>
      {isComplete ? (
        <motion.p
          className="harvest-complete-copy"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          丰收，从来不是轻而易举。
        </motion.p>
      ) : null}
    </section>
  );
}
