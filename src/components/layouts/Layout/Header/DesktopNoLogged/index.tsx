import React from "react";

import { AppBar, AppBarProps, Box, CssBaseline, Toolbar } from "@mui/material";

import { Link } from "react-router-dom";
import CibusLogo from "./../../../../../utils/images/cibus.png";

const navItems = [
  {
    name: "Iniciar sesión",
    route: "/login",
  },
  {
    name: "Regístrate",
    route: "/signin",
  },
];

export default function DesktopNoLogged(props: AppBarProps) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" {...props}>
          <Toolbar>
            <Box component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">
                <img src={CibusLogo} alt="cibus logo" width={70} height={30} />
              </Link>
            </Box>
            <Box
              sx={{
                justifyContent: "space-between",
                px: 1,
              }}
            >
              {navItems.map(({ name, route }) => (
                <React.Fragment key={name}>
                  <Link to={route} style={{ marginLeft: 20 }}>
                    {name}
                  </Link>
                </React.Fragment>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
