import { Variants } from "framer-motion";

export const slideToRightVariants: Variants = {
  hidden: { x: "-100vw" },
  visible: { x: 0, transition: { ease: "easeInOut", duration: 0.5 } },
  exit: { x: "-100vw", transition: { ease: "easeInOut", duration: 0.5 } },
};

export const slideToLeftVariants: Variants = {
  hidden: { x: "100vw" },
  visible: { x: 0, transition: { ease: "easeInOut", duration: 0.5 } },
  exit: { x: "100vw", transition: { ease: "easeInOut", duration: 0.5 } },
};

export const slideToTopVariants = {
  hidden: { y: "100vh" },
  visible: { y: 0, transition: { ease: "easeInOut", duration: 0.5 } },
  exit: { y: "100vh", transition: { ease: "easeInOut", duration: 0.5 } },
};

export const slideToBottomVariants = {
  hidden: { y: "-100vh" },
  visible: { y: 0, transition: { ease: "easeInOut", duration: 0.5 } },
  exit: { y: "-100vh", transition: { ease: "easeInOut", duration: 0.5 } },
};
