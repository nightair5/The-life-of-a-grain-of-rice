import { motion } from "framer-motion";
import { riceAssets } from "../data/assets";

export default function HomeUniverseScene() {
  return (
    <div className="home-universe-scene" aria-hidden="true">
      <motion.div
        className="universe-wash universe-wash-one"
        animate={{ x: [0, 10, 0], opacity: [0.36, 0.52, 0.36] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="universe-wash universe-wash-two"
        animate={{ x: [0, -12, 0], opacity: [0.22, 0.42, 0.22] }}
        transition={{ duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        className="universe-rice-core"
        src={riceAssets.home.universe}
        alt=""
        draggable="false"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: [1, 1.018, 1], y: [0, -7, 0] }}
        transition={{
          opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="universe-light"
        animate={{ scale: [0.96, 1.08, 0.96], opacity: [0.36, 0.62, 0.36] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="universe-orbit-map">
        <span />
        <span />
        <span />
      </div>
      <div className="universe-season-dial">
        <span>春</span>
        <span>夏</span>
        <span>秋</span>
        <span>冬</span>
      </div>
      <div className="universe-water-lines">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="universe-terraces">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="universe-field-notes">
        <span>田野</span>
        <span>日光</span>
        <span>水声</span>
        <span>双手</span>
      </div>
      <div className="universe-stars">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}
