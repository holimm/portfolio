'use client';
import { createContext, useContext, useMemo } from 'react';
import { cardVariants, type CardVariantProps } from '../config/Card.Config';

export interface UseCardProps extends CardVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  alignContent?: string;
}

// Context Provider
const CardContext = createContext<UseCardReturn | undefined>(undefined);

const useCardContext = () => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error('Missing CardProvider');
  }
  return context;
};

const CardProvider = CardContext.Provider;

export { CardProvider, useCardContext };

// Custom hook for using the context
export const useCard = (props: UseCardProps) => {
  const {
    ref: cardRef,
    variant = 'default',
    rounded,
    color,
    custom = 'elevated',
    direction = 'vertical',
    padding,
    height,
    width,
  } = props;

  const {
    root: cardStyle,
    header: cardHeaderStyle,
    body: cardBodyStyle,
    footer: cardFooterStyle,
    icon: cardIconStyle,
  } = useMemo(
    () =>
      cardVariants({
        variant,
        custom,
        rounded,
        color,
        padding,
        direction,
        height,
        width,
      }),
    [variant, custom, rounded, color, padding, direction, height, width]
  );

  return {
    cardRef,
    cardStyle,
    cardHeaderStyle,
    cardBodyStyle,
    cardFooterStyle,
    cardIconStyle,
  };
};

export type UseCardReturn = ReturnType<typeof useCard>;
