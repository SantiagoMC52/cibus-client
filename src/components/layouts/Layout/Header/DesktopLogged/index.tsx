import React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  AppBarProps,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
} from "@mui/material";

import CibusLogo from "./../../../../../utils/images/cibus.png";
import { useUserContext } from "../../../../../hooks";
import UserMenu from "./UserMenu";
import CustomAvatar from "../components/CustomAvatar";

const ID = "user-menu";

export default function DesktopLogged(props: AppBarProps) {
  const [isOpen, setIsOpen] = React.useState<HTMLElement | null>(null);
  const { user } = useUserContext();

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
              <IconButton
                edge="end"
                aria-controls={ID}
                aria-haspopup="true"
                onClick={(e) => setIsOpen(e.currentTarget)}
                color="inherit"
              >
                <CustomAvatar name={user?.name} lastName={user?.last_name} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <UserMenu
        id={ID}
        anchorEl={isOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(isOpen)}
        onClose={() => setIsOpen(null)}
      />
    </>
  );
}
