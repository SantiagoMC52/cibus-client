import React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  AppBarProps,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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

export default function MobileNoLogged(props: AppBarProps) {
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" {...props}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100%",
            },
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 1,
                py: 2,
              }}
            >
              <Link to="/">
                <img src={CibusLogo} alt="cibus logo" width={50} height={20} />
              </Link>
              <CloseIcon onClick={handleDrawerToggle} />
            </Box>
            <Divider />
            <List>
              {navItems.map(({ name, route }) => (
                <React.Fragment key={name}>
                  <ListItem key={name} disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                      <Link to={route}>{name}</Link>
                    </ListItemButton>
                  </ListItem>
                  <Divider
                    variant="middle"
                    sx={{
                      my: 1,
                      borderColor: "grey",
                      width: "90%",
                    }}
                  />
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}
