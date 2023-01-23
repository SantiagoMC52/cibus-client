import { ReactNode } from "react";
import { Box } from "@mui/material";

type LayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#f7f8fb",
      }}
    >
      {children}
    </Box>
  );
};

export default RootLayout;
