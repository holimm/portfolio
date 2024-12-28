import { Variants } from "motion/react";

export const slideToRightVariants = (duration: number = 0.5): Variants => {
  return {
    hidden: { x: "-100vw" },
    visible: { x: 0, transition: { ease: "easeInOut", duration: duration } },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut", duration: duration },
    },
  };
};

export const slideToLeftVariants = (duration: number = 0.5): Variants => {
  return {
    hidden: { x: "100vw" },
    visible: { x: 0, transition: { ease: "easeInOut", duration: duration } },
    exit: { x: "100vw", transition: { ease: "easeInOut", duration: duration } },
  };
};

export const slideToTopVariants = (duration: number = 0.5): Variants => {
  return {
    hidden: { y: "100vh" },
    visible: { y: 0, transition: { ease: "easeInOut", duration: duration } },
    exit: { y: "100vh", transition: { ease: "easeInOut", duration: duration } },
  };
};

export const slideToBottomVariants = (duration: number = 0.5): Variants => {
  return {
    hidden: { y: "-100vh" },
    visible: { y: 0, transition: { ease: "easeInOut", duration: duration } },
    exit: {
      y: "-100vh",
      transition: { ease: "easeInOut", duration: duration },
    },
  };
};
