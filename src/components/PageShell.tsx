import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import ActionCards from "./ActionCards";
import ActionHeroVisual from "./ActionHeroVisual";
import AmbientDecor from "./AmbientDecor";
import CompareSlider from "./CompareSlider";
import CultureScrollPanel from "./CultureScrollPanel";
import FarmingParallaxScene from "./FarmingParallaxScene";
import FloatingGrain from "./FloatingGrain";
import HarvestSwipeInteraction from "./HarvestSwipeInteraction";
import HomeUniverseScene from "./HomeUniverseScene";
import InkSeal from "./InkSeal";
import JourneyTrail from "./JourneyTrail";
import MotionLayer from "./MotionLayer";
import PosterTitle from "./PosterTitle";
import PrimaryButton from "./PrimaryButton";
import RiceBowlScene from "./RiceBowlScene";
import SectionLabel from "./SectionLabel";
import SeedGrowthScene from "./SeedGrowthScene";
import SolarTermTimeline from "./SolarTermTimeline";
import StoryCaption from "./StoryCaption";
import TextLinkButton from "./TextLinkButton";
import type { JourneyMilestone } from "../data/journey";
import type { RicePage } from "../data/pages";

type PageShellProps = {
  page: RicePage;
  pageIndex: number;
  totalPages: number;
  selectedAction: string | null;
  isImageFailed: boolean;
  isHomeLeaving: boolean;
  journeyMilestones: JourneyMilestone[];
  journeySummary: string;
  onNext: () => void;
  onImageError: (src: string) => void;
  onSelectAction: (action: string) => void;
  onGeneratePoster: () => void;
  onJourneyMilestone: (milestone: JourneyMilestone) => void;
};

function grainVariant(visual: RicePage["visual"]) {
  if (visual === "waste" || visual === "culture") {
    return "mist" as const;
  }

  if (visual === "home" || visual === "harvest" || visual === "action") {
    return "gold" as const;
  }

  return "light" as const;
}

function useMobileStableMotion() {
  const [isMobileStableMotion, setIsMobileStableMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => setIsMobileStableMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  return isMobileStableMotion;
}

export default function PageShell({
  page,
  pageIndex,
  totalPages,
  selectedAction,
  isImageFailed,
  isHomeLeaving,
  journeyMilestones,
  journeySummary,
  onNext,
  onImageError,
  onSelectAction,
  onGeneratePoster,
  onJourneyMilestone,
}: PageShellProps) {
  const [harvestComplete, setHarvestComplete] = useState(false);
  const [seedComplete, setSeedComplete] = useState(false);
  const useStableMotion = useMobileStableMotion();
  const isLastPage = pageIndex === totalPages - 1;
  const isHarvestPage = page.visual === "harvest";
  const isSeedPage = page.visual === "seed";

  useEffect(() => {
    setHarvestComplete(false);
    setSeedComplete(false);
  }, [page.id]);

  const canContinue =
    (!isHarvestPage || harvestComplete) && (!isSeedPage || seedComplete);
  const nextLabel = (() => {
    if (isSeedPage && !seedComplete) {
      return "轻点种子后继续";
    }

    if (isHarvestPage && !harvestComplete) {
      return "完成收割后继续";
    }

    return "继续";
  })();

  return (
    <motion.article
      key={page.id}
      className={`poster-page poster-${page.visual} layout-${page.layout}${
        isHomeLeaving ? " home-leaving" : ""
      }`}
      initial={
        useStableMotion
          ? { opacity: 0, y: 18 }
          : { opacity: 0, y: 40, scale: 0.985 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        useStableMotion
          ? { opacity: 0, y: -14 }
          : { opacity: 0, y: -32, scale: 0.985 }
      }
      transition={{
        duration: useStableMotion ? 0.46 : 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-labelledby={`${page.id}-title`}
    >
      {!isImageFailed ? (
        <motion.div
          className={`poster-media media-${page.image.role} media-${page.visual}`}
          style={
            {
              "--image-position": page.image.position ?? "50% 50%",
            } as CSSProperties
          }
          initial={
            useStableMotion ? { opacity: 0.86 } : { opacity: 0.72, scale: 1.04 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: useStableMotion ? 0.58 : 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden={page.image.role === "background"}
        >
          <img
            src={page.image.src}
            alt={page.image.role === "background" ? "" : page.image.alt}
            loading={pageIndex < 2 ? "eager" : "lazy"}
            decoding="async"
            draggable="false"
            onError={() => onImageError(page.image.src)}
          />
        </motion.div>
      ) : null}

      <AmbientDecor visual={page.visual} />
      {page.visual === "home" ? <HomeUniverseScene /> : null}
      {page.visual === "action" ? <ActionHeroVisual /> : null}
      <JourneyTrail
        currentPage={pageIndex}
        totalPages={totalPages}
        milestones={journeyMilestones}
      />
      <FloatingGrain count={page.visual === "home" ? 16 : 10} variant={grainVariant(page.visual)} />

      <SectionLabel
        current={pageIndex + 1}
        total={totalPages}
        label="从田间到餐桌"
      />

      <InkSeal value={page.seal} />

      {page.visual === "seed" ? (
        <SeedGrowthScene
          onComplete={() => {
            setSeedComplete(true);
            onJourneyMilestone("seed");
          }}
        />
      ) : null}
      {page.visual === "solar" && page.solarTerms ? (
        <SolarTermTimeline terms={page.solarTerms} />
      ) : null}
      {page.visual === "work" ? <FarmingParallaxScene /> : null}
      {page.visual === "table" ? <RiceBowlScene /> : null}

      <MotionLayer className="poster-copy" delay={0.08}>
        <PosterTitle id={`${page.id}-title`} lines={page.titleLines} />

        {page.visual === "culture" ? (
          <CultureScrollPanel lines={page.bodyLines} insight={page.insight} />
        ) : (
          <>
            <motion.div
              className="poster-body"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {page.bodyLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </motion.div>
            <StoryCaption text={page.insight} />
          </>
        )}

        {!isLastPage && page.visual !== "action" ? (
          page.visual === "home" ? (
            <PrimaryButton onClick={onNext}>{page.actionLabel}</PrimaryButton>
          ) : (
            <TextLinkButton
              label={nextLabel}
              onClick={canContinue ? onNext : undefined}
              disabled={!canContinue}
            />
          )
        ) : null}
      </MotionLayer>

      {page.visual === "harvest" ? (
        <HarvestSwipeInteraction
          onComplete={() => {
            setHarvestComplete(true);
            onJourneyMilestone("harvest");
          }}
        />
      ) : null}
      {page.visual === "waste" && page.comparison ? (
        <CompareSlider
          comparison={page.comparison}
          onCompared={() => onJourneyMilestone("compare")}
        />
      ) : null}
      {page.visual === "action" && page.actionChoices ? (
        <ActionCards
          choices={page.actionChoices}
          selectedAction={selectedAction}
          journeySummary={journeySummary}
          onSelectAction={onSelectAction}
          onGeneratePoster={onGeneratePoster}
        />
      ) : null}
    </motion.article>
  );
}
