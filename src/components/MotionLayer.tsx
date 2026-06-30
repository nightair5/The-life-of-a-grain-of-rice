import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionLayerProps = {
  className: string;
  delay?: number;
  children: ReactNode;
};

export default function MotionLayer({
  className,
  delay = 0,
  children,
}: MotionLayerProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
