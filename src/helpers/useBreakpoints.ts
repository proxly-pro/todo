// Core
import { useMediaQuery } from 'react-responsive';

export type BreakpointsTypes = {
  isDesktop?: boolean,
  isLaptop?: boolean,
  isMobile?: boolean,
  isTablet?: boolean,
};

export const useBreakpoints = (): BreakpointsTypes => {
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 599 });

  return { isDesktop, isLaptop, isTablet, isMobile };
};
