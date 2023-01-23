import React from "react";

import {
  AppBar,
  AppBarProps,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
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
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
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
