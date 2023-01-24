import { ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";

type LayoutProps = BoxProps & {
  children: ReactNode;
};

const RootLayout = ({ children, ...props }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#f7f8fb",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default RootLayout;
