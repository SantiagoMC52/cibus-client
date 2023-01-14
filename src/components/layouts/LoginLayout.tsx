import { Box, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import CibusLogo from "./../../utils/images/cibus.png";

const LoginLayout = ({ children }: any) => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <Link to="/">
          <img src={CibusLogo} alt="cibus logo" width={50} height={20} />
        </Link>
      </Box>

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

export default LoginLayout;
