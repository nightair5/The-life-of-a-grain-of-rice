import { motion } from "framer-motion";

type InkSealProps = {
  value: string;
};

export default function InkSeal({ value }: InkSealProps) {
  return (
    <motion.div
      className="ink-seal"
      initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <span className="seal-ring" />
      <span className="seal-cross" />
      <strong>{value}</strong>
    </motion.div>
  );
}
