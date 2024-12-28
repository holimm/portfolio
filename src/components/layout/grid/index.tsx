import { Grid as GridComponent, type GridProps } from './views/Grid';
import { GridItem, type GridItemProps } from './views/GridItem';

const Grid = Object.assign(GridComponent, { Item: GridItem });

export { Grid, type GridProps, type GridItemProps };
export { useGrid, type UseGridProps } from './utils/useGrid';
