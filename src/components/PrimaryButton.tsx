import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  showArrow?: boolean;
};

export default function PrimaryButton({
  children,
  className,
  showArrow = true,
  ...buttonProps
}: PrimaryButtonProps) {
  return (
    <motion.button
      className={className ? `primary-button ${className}` : "primary-button"}
      type="button"
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.18 }}
      {...buttonProps}
    >
      <span>{children}</span>
      {showArrow ? <i aria-hidden="true" /> : null}
    </motion.button>
  );
}
