import { motion } from "framer-motion";
import type { RicePage } from "../data/pages";

type StoryPageProps = {
  page: RicePage;
  pageIndex: number;
  totalPages: number;
  onNext: () => void;
};

export default function StoryPage({
  page,
  pageIndex,
  totalPages,
  onNext,
}: StoryPageProps) {
  const isLastPage = pageIndex === totalPages - 1;

  return (
    <motion.section
      key={page.id}
      className={`story-page story-${page.visual}`}
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -28 }}
      transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby={`${page.id}-title`}
    >
      <div className="page-count">
        {String(pageIndex + 1).padStart(2, "0")} /{" "}
        {String(totalPages).padStart(2, "0")}
      </div>

      <div className={`abstract-visual visual-${page.visual}`} aria-hidden="true">
        <span className="visual-core">{page.sceneLabel}</span>
        <span className="visual-line visual-line-one" />
        <span className="visual-line visual-line-two" />
      </div>

      <div className="story-copy">
        <h1 id={`${page.id}-title`}>{page.title}</h1>

        {page.body ? <p className="story-body">{page.body}</p> : null}

        {page.solarTerms ? (
          <div className="solar-terms" aria-label="节气词">
            {page.solarTerms.map((term) => (
              <span key={term}>{term}</span>
            ))}
          </div>
        ) : null}

        {page.harvestHint ? (
          <p className="harvest-hint">{page.harvestHint}</p>
        ) : null}

        {page.comparison ? (
          <div className="comparison-grid">
            {page.comparison.map((item) => (
              <article key={item.label} className="comparison-item">
                <strong>{item.label}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        ) : null}

        {page.extraText ? <p className="extra-text">{page.extraText}</p> : null}

        {page.actionChoices ? (
          <div className="action-choices">
            {page.actionChoices.map((choice, index) => (
              <div key={choice} className="choice-item">
                <span>{index + 1}</span>
                <p>{choice}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {page.actionLabel ? (
        <button
          className={isLastPage ? "next-button poster-button" : "next-button"}
          type="button"
          onClick={isLastPage ? undefined : onNext}
        >
          {page.actionLabel}
          <span className="button-line" aria-hidden="true" />
        </button>
      ) : null}
    </motion.section>
  );
}
