import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import type { RicePage } from "../data/pages";

type CompareSliderProps = {
  comparison: NonNullable<RicePage["comparison"]>;
  onCompared?: () => void;
};

function clampPercent(value: number) {
  return Math.min(Math.max(value, 14), 86);
}

export default function CompareSlider({
  comparison,
  onCompared,
}: CompareSliderProps) {
  const [sliderPercent, setSliderPercent] = useState(50);
  const [hasCompared, setHasCompared] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const hasComparedRef = useRef(false);

  const markComparedIfNearEnd = (nextPercent: number) => {
    if (nextPercent <= 16 || nextPercent >= 84) {
      if (!hasComparedRef.current) {
        hasComparedRef.current = true;
        onCompared?.();
      }

      setHasCompared(true);
    }
  };

  const updateSlider = (clientX: number) => {
    const slider = sliderRef.current;

    if (!slider) {
      return sliderPercent;
    }

    const rect = slider.getBoundingClientRect();
    const nextPercent = clampPercent(((clientX - rect.left) / rect.width) * 100);
    setSliderPercent(nextPercent);
    markComparedIfNearEnd(nextPercent);
    return nextPercent;
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateSlider(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      return;
    }

    updateSlider(event.clientX);
  };

  const finishDrag = () => {
    if (!isDraggingRef.current) {
      return;
    }

    isDraggingRef.current = false;
    setIsDragging(false);
    markComparedIfNearEnd(sliderPercent);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const nextPercent = clampPercent(
      sliderPercent + (event.key === "ArrowRight" ? 8 : -8),
    );
    setSliderPercent(nextPercent);
    markComparedIfNearEnd(nextPercent);
  };

  const saveStrength = (sliderPercent / 100).toFixed(2);
  const wasteStrength = ((100 - sliderPercent) / 100).toFixed(2);
  const compareStyle = {
    "--compare-percent": `${sliderPercent}%`,
    "--save-strength": saveStrength,
    "--waste-strength": wasteStrength,
  } as CSSProperties;

  return (
    <section className="compare-slider-shell compare-destiny-shell" aria-label="珍惜与浪费滑动对比">
      <div
        ref={sliderRef}
        className={[
          "compare-destiny-stage",
          isDragging ? "is-dragging" : "",
          hasCompared ? "has-compared" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={compareStyle}
        role="slider"
        tabIndex={0}
        aria-valuemin={14}
        aria-valuemax={86}
        aria-valuenow={Math.round(sliderPercent)}
        aria-label="左右拖动，查看珍惜与浪费的两种结局"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={handleKeyDown}
      >
        <article className="compare-destiny-panel compare-destiny-save">
          <img
            src={comparison.save.image}
            alt=""
            draggable="false"
            loading="lazy"
            decoding="async"
          />
          <div className="compare-panel-tone compare-panel-warm" aria-hidden="true" />
          <div className="compare-table-light" aria-hidden="true" />
          <div className="compare-rice-stream compare-rice-stream-save" aria-hidden="true">
            {Array.from({ length: 11 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="compare-panel-copy">
            <strong>{comparison.save.label}</strong>
            <p>
              {comparison.save.bodyLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
        </article>

        <article className="compare-destiny-panel compare-destiny-waste">
          <img
            src={comparison.waste.image}
            alt=""
            draggable="false"
            loading="lazy"
            decoding="async"
          />
          <div className="compare-panel-tone compare-panel-cold" aria-hidden="true" />
          <div className="compare-waste-shadow" aria-hidden="true" />
          <div className="compare-rice-stream compare-rice-stream-waste" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="compare-panel-copy">
            <strong>{comparison.waste.label}</strong>
            <p>
              {comparison.waste.bodyLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
        </article>

        <div className="compare-central-divider" aria-hidden="true">
          <span className="compare-drag-handle">
            <i />
            <b>拖动</b>
          </span>
        </div>
      </div>

      <div className="compare-foreground-decor" aria-hidden="true">
        <span className="compare-foregrain compare-foregrain-one" />
        <span className="compare-foregrain compare-foregrain-two" />
        <span className="compare-paper-piece compare-paper-piece-one" />
        <span className="compare-paper-piece compare-paper-piece-two" />
      </div>

      <p className={hasCompared ? "compare-result visible" : "compare-result"}>
        {hasCompared ? "选择很小，后果很远。" : "拖动到任一端，看看一碗饭的两种结局。"}
      </p>
    </section>
  );
}
