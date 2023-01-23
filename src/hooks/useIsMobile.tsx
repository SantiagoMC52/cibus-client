import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

const useIsMobile = (breakPoint: Breakpoint) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakPoint));
};

export default useIsMobile;
