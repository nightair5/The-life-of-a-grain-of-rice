import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import PageFrame from "./components/PageFrame";
import PageIndicator from "./components/PageIndicator";
import PageShell from "./components/PageShell";
import PosterGenerator from "./components/PosterGenerator";
import SwipeHint from "./components/SwipeHint";
import { getJourneySummary, type JourneyMilestone } from "./data/journey";
import { ricePages } from "./data/pages";

const lastPageIndex = ricePages.length - 1;

function clampPage(pageIndex: number) {
  return Math.min(Math.max(pageIndex, 0), lastPageIndex);
}

function useMobileViewportLock() {
  useEffect(() => {
    const root = document.documentElement;
    let lastWidth = 0;
    let lastHeight = 0;
    let frameId = 0;

    const applyViewportSize = (force = false) => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const viewport = window.visualViewport;
        const width = Math.round(window.innerWidth || viewport?.width || 0);
        const height = Math.round(window.innerHeight || viewport?.height || 0);
        const isRealResize =
          Math.abs(width - lastWidth) > 8 || Math.abs(height - lastHeight) > 140;

        if (force || !lastHeight || isRealResize) {
          root.style.setProperty("--app-height", `${height}px`);
          root.style.setProperty("--app-width", `${width}px`);
          lastWidth = width;
          lastHeight = height;
        }
      });
    };

    const handleResize = () => applyViewportSize(false);

    const handleVisualViewportResize = () => applyViewportSize(false);

    const handleOrientationChange = () => {
      applyViewportSize(true);
      window.setTimeout(() => applyViewportSize(true), 320);
    };

    const preventDocumentPan = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        event.preventDefault();
      }
    };

    applyViewportSize(true);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);
    window.visualViewport?.addEventListener("resize", handleVisualViewportResize);
    document.addEventListener("touchmove", preventDocumentPan, {
      passive: false,
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.visualViewport?.removeEventListener(
        "resize",
        handleVisualViewportResize,
      );
      document.removeEventListener("touchmove", preventDocumentPan);
    };
  }, []);
}

export default function App() {
  useMobileViewportLock();

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showActionPoster, setShowActionPoster] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isHomeLeaving, setIsHomeLeaving] = useState(false);
  const [journeyMilestones, setJourneyMilestones] = useState<
    JourneyMilestone[]
  >([]);
  const wheelLockedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const journeySummary = getJourneySummary(journeyMilestones);

  const markJourneyMilestone = useCallback((milestone: JourneyMilestone) => {
    setJourneyMilestones((currentMilestones) =>
      currentMilestones.includes(milestone)
        ? currentMilestones
        : [...currentMilestones, milestone],
    );
  }, []);

  const goToPage = useCallback((pageIndex: number) => {
    setIsHomeLeaving(false);
    setShowActionPoster(false);
    setCurrentPage(clampPage(pageIndex));
  }, []);

  const goPrevious = useCallback(() => {
    setShowActionPoster(false);
    setIsHomeLeaving(false);
    setCurrentPage((pageIndex) => clampPage(pageIndex - 1));
  }, []);

  const goNext = useCallback(() => {
    if (currentPage === 0) {
      setIsHomeLeaving(true);
      window.setTimeout(() => {
        setCurrentPage(1);
        setIsHomeLeaving(false);
      }, 360);
      return;
    }

    setShowActionPoster(false);
    setCurrentPage((pageIndex) => clampPage(pageIndex + 1));
  }, [currentPage]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (
        showActionPoster ||
        wheelLockedRef.current ||
        Math.abs(event.deltaY) < 30
      ) {
        return;
      }

      wheelLockedRef.current = true;

      if (event.deltaY > 0) {
        goNext();
      } else {
        goPrevious();
      }

      window.setTimeout(() => {
        wheelLockedRef.current = false;
      }, 720);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [goNext, goPrevious, showActionPoster]);

  useEffect(() => {
    const isActionPage = ricePages[currentPage].visual === "action";

    if (!isActionPage || !selectedAction) {
      setShowActionPoster(false);
    }
  }, [currentPage, selectedAction]);

  useEffect(() => {
    const isActionPage = ricePages[currentPage].visual === "action";

    if (
      isActionPage &&
      !selectedAction &&
      journeyMilestones.includes("compare")
    ) {
      setSelectedAction("按需盛饭");
    }
  }, [currentPage, journeyMilestones, selectedAction]);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    if (showActionPoster) {
      return;
    }

    touchStartYRef.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (showActionPoster || touchStartYRef.current === null) {
      return;
    }

    const touchEndY = event.changedTouches[0].clientY;
    const moveDistance = touchStartYRef.current - touchEndY;

    if (Math.abs(moveDistance) > 48) {
      if (moveDistance > 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    touchStartYRef.current = null;
  };

  const handleSelectAction = useCallback((action: string) => {
    setSelectedAction(action);
    setShowActionPoster(false);
  }, []);

  const handleGeneratePoster = () => {
    if (!selectedAction) {
      return;
    }

    setShowActionPoster(true);
  };

  const handleImageError = (src: string) => {
    setFailedImages((currentImages) => ({
      ...currentImages,
      [src]: true,
    }));
  };

  const page = ricePages[currentPage];

  return (
    <main className="app-stage">
      <section
        className={`phone-frame theme-${page.visual}${
          showActionPoster ? " poster-open" : ""
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="一粒米的一生互动H5"
      >
        <PageFrame variant={page.visual}>
          <AnimatePresence mode="wait">
            <PageShell
              key={page.id}
              page={page}
              pageIndex={currentPage}
              totalPages={ricePages.length}
              selectedAction={selectedAction}
              isImageFailed={Boolean(failedImages[page.image.src])}
              isHomeLeaving={isHomeLeaving}
              journeyMilestones={journeyMilestones}
              journeySummary={journeySummary}
              onNext={goNext}
              onImageError={handleImageError}
              onSelectAction={handleSelectAction}
              onGeneratePoster={handleGeneratePoster}
              onJourneyMilestone={markJourneyMilestone}
            />
          </AnimatePresence>

          {showActionPoster && selectedAction ? (
            <PosterGenerator
              selectedAction={selectedAction}
              journeySummary={journeySummary}
              onClose={() => setShowActionPoster(false)}
            />
          ) : null}

          <PageIndicator
            currentPage={currentPage}
            totalPages={ricePages.length}
            onSelect={goToPage}
          />
          <SwipeHint />
        </PageFrame>
      </section>
    </main>
  );
}
