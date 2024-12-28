import {
  Card as CardRoot,
  type CardProps as CardRootProps,
} from './views/Card';
import { CardHeader } from './views/CardHeader';
import { CardBody } from './views/CardBody';
import { useCard, type UseCardProps } from './utils/useCard';

const Card = CardRoot as typeof CardRoot & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
};

Card.Header = CardHeader;
Card.Body = CardBody;

export { Card, type CardRootProps, useCard, type UseCardProps };
