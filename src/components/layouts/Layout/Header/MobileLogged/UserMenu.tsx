import { Box, Divider, Drawer, DrawerProps, List } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CibusLogo from "./../../../../../utils/images/cibus.png";
import MenuCustomIcon from "../components/MenuCustomIcon";
import { useCookie } from "../../../../../hooks";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

type Props = DrawerProps & {
  // eslint-disable-next-line no-undef
  handleClose: VoidFunction;
};

export default function UserMenu({ handleClose, ...props }: Props) {
  const navigate = useNavigate();
  const [, , removeAccessToken] = useCookie("USER_ACCESS_TOKEN");
  return (
    <Drawer
      variant="temporary"
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "100%",
        },
      }}
      {...props}
    >
      <Box onClick={handleClose}>
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
          <MenuCustomIcon
            icon={<PersonIcon />}
            handleClick={() => navigate("/profile")}
            text="Perfil"
          />
          <MenuCustomIcon
            icon={<LogoutIcon />}
            handleClick={() => {
              removeAccessToken();
              navigate("/");
            }}
            text="Cerrar sesión"
          />
        </List>
      </Box>
    </Drawer>
  );
}
