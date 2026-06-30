import { motion } from "framer-motion";
import { riceAssets } from "../data/assets";

export default function ActionHeroVisual() {
  return (
    <motion.div
      className="action-hero-visual"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 1.08, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.92, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="action-hero-halo action-hero-halo-outer"
        animate={{ rotate: [0, 6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="action-hero-halo action-hero-halo-inner"
        animate={{ rotate: [0, -5, 0] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        className="action-hero-branch"
        src={riceAssets.action.branch}
        alt=""
        draggable="false"
        decoding="async"
        animate={{ y: [0, -7, 0], rotate: [-1.2, 1.2, -1.2] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="action-hero-rice" />
      <div className="action-hero-grains">
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </motion.div>
  );
}
