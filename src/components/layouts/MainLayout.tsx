import { ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";

type Props = BoxProps & {
  children: ReactNode;
};

const MainLayout = ({ children, ...props }: Props) => {
  return (
    <>
      <Header />
      <Box sx={{ flex: 1, width: "100%", mt: 9 }} {...props}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
