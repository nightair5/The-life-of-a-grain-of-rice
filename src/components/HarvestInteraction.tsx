import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const HARVEST_DISTANCE = 96;

type DragState = {
  startX: number;
  startY: number;
  lastX: number;
  isHorizontal: boolean;
};

export default function HarvestInteraction() {
  const [isComplete, setIsComplete] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStateRef = useRef<DragState | null>(null);

  useEffect(() => {
    if (isComplete) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowNudge(true);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isComplete]);

  const beginDrag = (x: number, y: number) => {
    if (isComplete) {
      return;
    }

    setShowNudge(false);
    dragStateRef.current = {
      startX: x,
      startY: y,
      lastX: x,
      isHorizontal: false,
    };
  };

  const updateDrag = (x: number, y: number) => {
    const dragState = dragStateRef.current;

    if (!dragState || isComplete) {
      return false;
    }

    const deltaX = x - dragState.startX;
    const deltaY = y - dragState.startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (!dragState.isHorizontal && absX > 14 && absX > absY * 1.35) {
      dragState.isHorizontal = true;
    }

    dragState.lastX = x;

    if (dragState.isHorizontal) {
      setDragOffset(Math.min(Math.max(deltaX, -118), 118));
      return true;
    }

    return false;
  };

  const endDrag = () => {
    const dragState = dragStateRef.current;

    if (!dragState || isComplete) {
      dragStateRef.current = null;
      return false;
    }

    const deltaX = dragState.lastX - dragState.startX;
    const shouldComplete =
      dragState.isHorizontal && Math.abs(deltaX) >= HARVEST_DISTANCE;

    if (shouldComplete) {
      setIsComplete(true);
      setDragOffset(deltaX > 0 ? 128 : -128);
    } else {
      setDragOffset(0);
    }

    dragStateRef.current = null;
    return dragState.isHorizontal;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    beginDrag(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      return;
    }

    updateDrag(event.clientX, event.clientY);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      return;
    }

    endDrag();
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    beginDrag(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    const isHorizontal = updateDrag(touch.clientX, touch.clientY);

    if (isHorizontal) {
      event.stopPropagation();
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const isHorizontal = endDrag();

    if (isHorizontal) {
      event.stopPropagation();
    }
  };

  return (
    <div
      className={
        isComplete
          ? "harvest-interaction harvest-complete"
          : "harvest-interaction"
      }
      aria-live="polite"
    >
      <div
        className="harvest-drag-zone"
        role="button"
        tabIndex={0}
        aria-label="横向滑动收割稻穗"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="harvest-field-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="harvest-sheaves" aria-hidden="true">
          {Array.from({ length: 7 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <motion.div
          className="harvest-blade"
          aria-hidden="true"
          animate={{ x: dragOffset }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
        />
        <p className={showNudge ? "harvest-drag-tip nudge" : "harvest-drag-tip"}>
          滑动收割稻穗
        </p>
      </div>

      {isComplete ? (
        <motion.p
          className="harvest-complete-text"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          丰收，从来不是轻而易举。
        </motion.p>
      ) : null}
    </div>
  );
}
