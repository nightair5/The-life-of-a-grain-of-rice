import { motion } from "framer-motion";

type StoryCaptionProps = {
  text: string;
};

export default function StoryCaption({ text }: StoryCaptionProps) {
  return (
    <motion.p
      className="poster-insight story-caption"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.p>
  );
}
