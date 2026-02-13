"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function ReviewsTransition({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.ul
          id="reviews-section"
          key="reviews"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="grid gap-6 mt-6 overflow-hidden"
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
