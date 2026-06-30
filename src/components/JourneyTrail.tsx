import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { JourneyMilestone } from "../data/journey";

type JourneyTrailProps = {
  currentPage: number;
  totalPages: number;
  milestones: JourneyMilestone[];
};

const milestoneNodes: Array<{
  id: JourneyMilestone;
  label: string;
  top: number;
}> = [
  { id: "seed", label: "种", top: 18 },
  { id: "harvest", label: "收", top: 56 },
  { id: "compare", label: "惜", top: 78 },
];

export default function JourneyTrail({
  currentPage,
  totalPages,
  milestones,
}: JourneyTrailProps) {
  const progress =
    totalPages > 1 ? Math.min((currentPage / (totalPages - 1)) * 100, 100) : 0;

  return (
    <div className="journey-trail" aria-hidden="true">
      <span className="journey-trail-line" />
      <motion.span
        className="journey-trail-progress"
        initial={{ height: 0 }}
        animate={{ height: `${progress}%` }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="journey-trail-grain"
        initial={{ top: "0%" }}
        animate={{ top: `${progress}%` }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      />
      {milestoneNodes.map((node) => (
        <span
          key={node.id}
          className={
            milestones.includes(node.id)
              ? "journey-trail-node done"
              : "journey-trail-node"
          }
          style={{ "--node-top": `${node.top}%` } as CSSProperties}
        >
          {node.label}
        </span>
      ))}
    </div>
  );
}
