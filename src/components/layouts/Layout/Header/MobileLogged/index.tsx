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

import { useUserContext } from "../../../../../hooks";
import CibusLogo from "./../../../../../utils/images/cibus.png";
import CustomAvatar from "../components/CustomAvatar";
import UserMenu from "./UserMenu";

const ID = "drawer-mobile-user-menu";

export default function MobileLogged(props: AppBarProps) {
  const { user } = useUserContext();

  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [isOpenUserMenu, setIsOpenUserMenu] = React.useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const divider = (
    <Divider
      variant="middle"
      sx={{
        my: 1,
        borderColor: "grey",
        width: "90%",
      }}
    />
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
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "flex-end",
                px: 1,
              }}
            >
              <IconButton
                edge="end"
                aria-controls={ID}
                aria-haspopup="true"
                onClick={(e) => setIsOpenUserMenu(true)}
                color="inherit"
              >
                <CustomAvatar name={user?.name} lastName={user?.last_name} />
              </IconButton>
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
                  <img
                    src={CibusLogo}
                    alt="cibus logo"
                    width={50}
                    height={20}
                  />
                </Link>
                <CloseIcon onClick={handleDrawerToggle} />
              </Box>
              <Divider />
              <List>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <Link to="#">Sobre nosotros</Link>
                  </ListItemButton>
                </ListItem>
                {divider}
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <Link to="#">Ayuda</Link>
                  </ListItemButton>
                </ListItem>
                {divider}
              </List>
            </Box>
          </Drawer>
        </Box>
      </Box>

      <UserMenu
        handleClose={() => setIsOpenUserMenu(false)}
        id={ID}
        anchor="right"
        open={isOpenUserMenu}
      />
    </>
  );
}
