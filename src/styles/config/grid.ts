type Layout = 'cols' | 'rows';
type Dimension =
  | 'none'
  | 'auto'
  | 'subgrid'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

interface GridConfig {
  variant: Layout;
  dimension: Dimension;
  className: {
    root: string;
  };
}

const generateGridConfig = (
  variant: Layout,
  dimension: Dimension
): GridConfig => {
  const baseClass = `grid-${variant}-${dimension}`;
  const rootClass =
    dimension === '12' && variant === 'cols'
      ? 'grid-cols-1 md:grid-cols-12'
      : baseClass;
  return {
    variant,
    dimension,
    className: {
      root: rootClass,
    },
  };
};

const dimensions: Dimension[] = [
  'none',
  'auto',
  'subgrid',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
];

const gridConfigs: GridConfig[] = [
  ...dimensions.map((dimension) => generateGridConfig('cols', dimension)),
  ...dimensions.map((dimension) => generateGridConfig('rows', dimension)),
];

export default gridConfigs;
