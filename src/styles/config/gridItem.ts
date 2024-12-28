type Layout = 'cols' | 'rows';
type Span =
  | 'none'
  | 'full'
  | 'auto'
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
type Start =
  | 'none'
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

interface GridItemConfig {
  layout: Layout;
  span?: Span;
  start?: Start;
  className: {
    root: string;
  };
}

const generateGridItemConfig = (): GridItemConfig[] => {
  const configs: GridItemConfig[] = [];

  const spans: Span[] = [
    'none',
    'full',
    'auto',
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
  const starts: Start[] = [
    'none',
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

  spans.forEach((span) => {
    configs.push({
      layout: 'cols',
      span,
      className: {
        root:
          span === 'none'
            ? ''
            : span === 'full'
              ? 'col-span-full'
              : span === 'auto'
                ? 'col-auto'
                : `col-span-1 md:col-span-${span}`,
      },
    });
  });

  starts.forEach((start) => {
    configs.push({
      layout: 'cols',
      start,
      className: {
        root: start === 'none' ? '' : `md:col-start-${start}`,
      },
    });
  });

  spans.forEach((span) => {
    configs.push({
      layout: 'rows',
      span,
      className: {
        root:
          span === 'none'
            ? ''
            : span === 'full'
              ? 'row-span-full'
              : span === 'auto'
                ? 'row-auto'
                : `md:row-span-${span}`,
      },
    });
  });

  starts.forEach((start) => {
    configs.push({
      layout: 'rows',
      start,
      className: {
        root: start === 'none' ? '' : `row-start-${start}`,
      },
    });
  });

  return configs;
};

export const gridItemConfigs = generateGridItemConfig();
