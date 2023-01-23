import { useNavigate } from "react-router-dom";
import { Menu, MenuProps } from "@mui/material";
import MenuCustomIcon from "./../components/MenuCustomIcon";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCookie } from "../../../../../hooks";

const UserMenu = (props: MenuProps) => {
  const [, , removeAccessToken] = useCookie("USER_ACCESS_TOKEN");
  const navigate = useNavigate();
  return (
    <Menu
      keepMounted
      PaperProps={{ sx: { minWidth: "240px", borderRadius: "16px" } }}
      {...props}
    >
      <MenuCustomIcon
        icon={<PersonIcon />}
        handleClick={() => navigate("/profile")}
        text="Perfil"
      />
      <MenuCustomIcon
        icon={<RestaurantIcon />}
        handleClick={() => navigate("/restaurants")}
        text="Restaurantes"
      />
      <MenuCustomIcon
        icon={<LogoutIcon />}
        handleClick={() => {
          removeAccessToken();
          navigate("/");
        }}
        text="Cerrar sesión"
      />
    </Menu>
  );
};

export default UserMenu;
