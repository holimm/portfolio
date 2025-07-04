import { Easing } from 'motion';
import { SlideOptions } from '@/types';

interface DrawerProps extends SlideOptions {
  open: boolean;
  onClose?: () => void;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  ease?: Easing;
  className?: string;
  backdropClassName?: string;
  duration?: number;
  ref?: React.Ref<HTMLDivElement>;
}

export const useDrawer = (props: DrawerProps) => {
  const {
    open,
    onClose,
    direction = 'right',
    ease,
    className,
    duration = 0.5,
    backdropClassName,
    ref: drawerRef,
  } = props;

  function getDrawerStyle(direction: string) {
    if (direction === 'left') {
      return { left: 0 };
    }
    if (direction === 'right') {
      return { right: 0 };
    }
    if (direction === 'top') {
      return { top: 0, left: 0, right: 0, height: 'auto', width: '100%' };
    }
    // bottom
    return { bottom: 0, left: 0, right: 0, height: 'auto', width: '100%' };
  }

  // New helper to get x/y based on direction
  function getDirection(direction: string) {
    switch (direction) {
      case 'left':
        return { x: '-100vw', y: 0 };
      case 'right':
        return { x: '100vw', y: 0 };
      case 'top':
        return { x: 0, y: '-100vh' };
      case 'bottom':
        return { x: 0, y: '100vh' };
      default:
        return { x: '100vw', y: 0 };
    }
  }

  const { x, y } = getDirection(direction);

  return {
    open,
    backdropClassName,
    getDrawerStyle,
    onClose,
    drawerRef,
    x,
    y,
    duration,
    ease,
    direction,
    className,
  };
};
