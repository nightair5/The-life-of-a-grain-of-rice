import { motion } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";

type TextLinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

export default function TextLinkButton({
  label = "继续",
  ...buttonProps
}: TextLinkButtonProps) {
  return (
    <motion.button
      className="text-link-button"
      type="button"
      whileTap={{ scale: 0.96 }}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.18 }}
      {...buttonProps}
    >
      <span>{label}</span>
      <i aria-hidden="true" />
    </motion.button>
  );
}
