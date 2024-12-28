"use client";
import { AnimatePresence, motion } from "motion/react";
import { ReactNode } from "react";

export const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AnimatePresence mode="wait">
          <motion.div
            key={typeof window !== "undefined" ? window.location.pathname : ""}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
};
