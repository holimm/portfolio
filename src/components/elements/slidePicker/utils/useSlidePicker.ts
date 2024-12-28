import {
  cloneElement,
  isValidElement,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  slidePickerVariants,
  type SlidePickerVariantProps,
} from "../styles/slidePicker.config";
import type { ISlidePickerType } from "../types/slidePicker.types";

export interface SlidePickerProps extends SlidePickerVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  type?: ISlidePickerType;
  startContent?: ReactNode;
  endContent?: ReactNode;
}
export type UseSlidePickerProps = SlidePickerProps &
  Omit<SlidePickerVariantProps, keyof SlidePickerVariantProps>;

export const useSlidePicker = (props: UseSlidePickerProps) => {
  const {
    type,
    ref: slidePickerRef,
    variant = "default",
    endContent: endContentProp,
    startContent: startContentProp,
  } = props;

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement(icon, {
          // @ts-ignore
          "aria-hidden": true,
          focusable: false,
          tabIndex: -1,
        })
      : null;

  const startContent = getIconClone(startContentProp);
  const endContent = getIconClone(endContentProp);

  const { root: slidePickerStyle } = useMemo(
    () =>
      slidePickerVariants({
        variant,
      }),
    [variant],
  );

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [items] = useState([
    "SH125",
    "SH150",
    "Air Blade 125",
    "Air Blade 150",
    "Vision",
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false); // State to track if mouse is down
  const [startX, setStartX] = useState(0); // Initial mouse X position
  const [scrollLeft, setScrollLeft] = useState(0); // Initial scroll position
  const [isScrolling, setIsScrolling] = useState(false); // New state for scrolling
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold scroll timeout

  // Handle scroll event
  const handleScroll = () => {
    const scrollPosition = scrollRef.current?.scrollLeft || 0; // Get current scroll position
    const itemWidth = scrollRef.current?.children[0].clientWidth || 0; // Get the width of an item
    const newIndex = Math.round(scrollPosition / itemWidth); // Calculate new index based on scroll position

    setSelectedIndex(newIndex); // Update selected index

    // Clear any previous timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set isScrolling to true when scroll starts
    setIsScrolling(true);

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 200);
  };

  // Scroll to the selected item
  const scrollToItem = useCallback(
    (index: number) => {
      let isRun = false;
      const item = scrollRef.current?.children[index];
      if (!isDown && !isScrolling) {
        if (item) {
          item.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        }
        isRun = true;
      }
    },
    [isDown, isScrolling],
  );

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
    scrollToItem(index);
  };

  const handleMouseDown = (event: MouseEvent | any) => {
    if (scrollRef.current) {
      setIsDown(true);
      setStartX(event.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleTouchDown = (event: TouchEvent | any) => {
    if (scrollRef.current) {
      setIsDown(true);
      setStartX(event.touches[0].pageX - scrollRef.current.offsetLeft); // For touch
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    scrollToItem(selectedIndex);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    scrollToItem(selectedIndex);
  };

  const handleMouseMove = (event: MouseEvent | any) => {
    if (!isDown) return; // Exit if mouse is not down
    if (scrollRef.current) {
      event.preventDefault();
      const x = event.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 3; // Scroll fast
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchMove = (event: TouchEvent | any) => {
    if (!isDown) return; // Exit if touch is not active
    if (scrollRef.current) {
      const x = event.touches[0].pageX - scrollRef.current.offsetLeft; // For touch
      const walk = (x - startX) * 2; // Scrolling speed
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleOnScroll = () => {
    if (!isDown) {
      handleMouseLeave();
    }
  };

  useEffect(() => {
    if (!isScrolling && !isDown) scrollToItem(selectedIndex);
  }, [isDown, isScrolling, scrollToItem, selectedIndex]);

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return {
    type,
    variant,
    slidePickerStyle,
    slidePickerRef,
    endContent,
    startContent,
    scrollRef,
    isDown,
    items,
    selectedIndex,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleTouchDown,
    handleTouchMove,
    handleOnScroll,
    handleItemClick,
  };
};
