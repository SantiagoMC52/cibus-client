import { ReactNode } from "react";
import { Box, BoxProps, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import CibusLogo from "./../../utils/images/cibus.png";

type Props = BoxProps & {
  children: ReactNode;
  logo?: boolean;
};

const CardLayout = ({ children, logo = false }: Props) => {
  return (
    <>
      {logo && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <Link to="/">
            <img src={CibusLogo} alt="cibus logo" width={110} height={40} />
          </Link>
        </Box>
      )}

      <Container
        component={Paper}
        maxWidth="xs"
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: [0, 4],
          p: [2, 5],
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default CardLayout;
