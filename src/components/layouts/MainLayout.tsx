import { Box } from "@mui/material";
import { ReactNode } from "react";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Box sx={{ flex: 1, width: "100%", mt: 10 }}>{children}</Box>
      <Footer />
    </>
  );
};

export default MainLayout;
