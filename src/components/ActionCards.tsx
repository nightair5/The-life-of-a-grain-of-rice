import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ActionChoice } from "../data/pages";
import GoldenConfetti from "./GoldenConfetti";
import PrimaryButton from "./PrimaryButton";

type ActionCardsProps = {
  choices: ActionChoice[];
  selectedAction: string | null;
  journeySummary?: string;
  onSelectAction: (action: string) => void;
  onGeneratePoster: () => void;
};

type ActionPresentation = {
  title: string;
  detail: string;
  icon: string;
  tone: string;
};

const actionPresentation: Record<string, ActionPresentation> = {
  portion: {
    title: "按需盛饭",
    detail: "今天吃多少，盛多少",
    icon: "碗",
    tone: "portion",
  },
  "clean-plate": {
    title: "光盘打卡",
    detail: "把这一餐认真吃完",
    icon: "盘",
    tone: "plate",
  },
  cherish: {
    title: "带走提醒",
    detail: "把惜粮讲给身边的人",
    icon: "米",
    tone: "grain",
  },
};

function getPresentation(choice: ActionChoice): ActionPresentation {
  return (
    actionPresentation[choice.id] ?? {
      title: choice.label,
      detail: "把惜粮变成一次具体行动",
      icon: "米",
      tone: "grain",
    }
  );
}

export default function ActionCards({
  choices,
  selectedAction,
  journeySummary,
  onSelectAction,
  onGeneratePoster,
}: ActionCardsProps) {
  const [isGathering, setIsGathering] = useState(false);

  useEffect(() => {
    setIsGathering(false);
  }, [selectedAction]);

  const handleGeneratePoster = () => {
    if (!selectedAction || isGathering) {
      return;
    }

    setIsGathering(true);
    window.setTimeout(() => {
      onGeneratePoster();
    }, 680);
  };

  return (
    <section
      className={
        isGathering
          ? "action-cards-panel action-cards-gathering"
          : "action-cards-panel"
      }
      aria-label="选择惜粮行动承诺"
    >
      <GoldenConfetti active={Boolean(selectedAction)} count={16} />
      <div className="action-pledge-kicker">选择你的惜粮承诺</div>
      <div className="action-card-list">
        {choices.map((choice, index) => {
          const presentation = getPresentation(choice);
          const isSelected = selectedAction === presentation.title;

          return (
            <motion.button
              key={choice.id}
              type="button"
              className={
                isSelected
                  ? `action-card action-card-${presentation.tone} selected`
                  : `action-card action-card-${presentation.tone}`
              }
              onClick={() => onSelectAction(presentation.title)}
              aria-pressed={isSelected}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: isSelected ? -2 : 0, scale: isSelected ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.44,
                delay: 0.12 + index * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="action-card-icon">{presentation.icon}</span>
              <span className="action-card-copy">
                <strong>{presentation.title}</strong>
                <small>{presentation.detail}</small>
              </span>
              <i aria-hidden="true" />
              {isSelected ? (
                <span className="action-card-sparks" aria-hidden="true">
                  {Array.from({ length: 6 }, (_, sparkIndex) => (
                    <b key={sparkIndex} />
                  ))}
                </span>
              ) : null}
            </motion.button>
          );
        })}
      </div>

      <div
        className={
          isGathering ? "action-gather-grains active" : "action-gather-grains"
        }
        aria-hidden="true"
      >
        {Array.from({ length: 16 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <PrimaryButton
        className={
          selectedAction
            ? "poster-generate-button ready"
            : "poster-generate-button"
        }
        disabled={!selectedAction || isGathering}
        onClick={handleGeneratePoster}
        showArrow={!isGathering}
      >
        {isGathering ? "米粒汇聚中..." : "生成我的行动海报"}
      </PrimaryButton>
      <p className="action-poster-note">
        {selectedAction
          ? "生成后可保存分享，邀请更多人一起珍惜粮食。"
          : journeySummary ?? "完成承诺后，生成你的行动海报。"}
      </p>
    </section>
  );
}
