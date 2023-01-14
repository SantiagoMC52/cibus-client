import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: {
          xs: "none",
          md: "1px solid rgba(30, 40, 51, 0.0671438)",
        },
        background: "#248ffa ",
        mt: 3,
      }}
    >
      <Typography component="p" textAlign="center" my={2}>
        Cibus &copy; Copyright 2023
      </Typography>
    </Box>
  );
};

export default Footer;
