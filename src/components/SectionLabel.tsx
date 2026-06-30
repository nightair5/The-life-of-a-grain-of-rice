import { motion } from "framer-motion";

type SectionLabelProps = {
  current: number;
  total: number;
  label: string;
};

export default function SectionLabel({
  current,
  total,
  label,
}: SectionLabelProps) {
  return (
    <motion.div
      className="section-label"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span>
        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <span>{label}</span>
    </motion.div>
  );
}
