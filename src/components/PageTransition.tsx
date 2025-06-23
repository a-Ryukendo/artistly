"use client";

import { motion } from "framer-motion";

/**
 * A simple wrapper component that uses Framer Motion to apply a
 * fade-in and slide-up animation to its children.
 * This is used in the root layout to animate page transitions.
 */
export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      // Initial state: invisible and slightly down
      initial={{ opacity: 0, y: 20 }}
      // Animate to: fully visible and at original position
      animate={{ opacity: 1, y: 0 }}
      // Exit state (not used in this setup but good practice)
      exit={{ opacity: 0, y: 20 }}
      // Animation timing and easing
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}; 