import React from "react";

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
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import CibusLogo from "./../../../../utils/images/cibus.png";
import { useUserContext } from "../../../../hooks/contexts";
import { useCookie } from "../../../../hooks";

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

export default function Header(props: AppBarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [, , removeAccessToken] = useCookie("USER_ACCESS_TOKEN");
  const { user } = useUserContext();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
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
        <CloseIcon />
      </Box>
      <Divider />
      <List>
        {!user &&
          navItems.map(({ name, route }) => (
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

        {user && (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Link to="/profile">Perfil</Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Link to="/" onClick={() => removeAccessToken()}>
                  Cerrar sesión
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

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
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Link to="/">
                <img src={CibusLogo} alt="cibus logo" width={70} height={30} />
              </Link>
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "space-between",
                px: 1,
              }}
            >
              {!user &&
                navItems.map(({ name, route }) => (
                  <React.Fragment key={name}>
                    <Link to={route} style={{ marginLeft: 20 }}>
                      {name}
                    </Link>
                  </React.Fragment>
                ))}
              {user && (
                <>
                  <Link to="/profile" style={{ marginLeft: 20 }}>
                    Perfil
                  </Link>
                  <Link
                    to="/"
                    style={{ marginLeft: 20 }}
                    onClick={() => removeAccessToken()}
                  >
                    Cerrar sesión
                  </Link>
                </>
              )}
            </Box>
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
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}
