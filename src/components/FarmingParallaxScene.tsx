import { motion } from "framer-motion";

export default function FarmingParallaxScene() {
  return (
    <div className="farming-scene" aria-hidden="true">
      <motion.span
        className="morning-light"
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 80, opacity: [0, 0.46, 0] }}
        transition={{ duration: 3.8, delay: 0.35, ease: "easeInOut" }}
      />
    </div>
  );
}
