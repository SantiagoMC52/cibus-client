import { ReactNode } from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

type Props = {
  handleClick: () => void;
  icon?: ReactNode;
  text: string;
  rightContent?: ReactNode;
};

const MenuCustomIcon = ({ handleClick, icon, text, rightContent }: Props) => {
  return (
    <MenuItem onClick={handleClick} sx={{ mt: 1 }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
      {rightContent}
    </MenuItem>
  );
};

export default MenuCustomIcon;
