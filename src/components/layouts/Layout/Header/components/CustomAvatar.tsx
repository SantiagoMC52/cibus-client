import { Avatar } from "@mui/material";

function stringAvatar(name: string) {
  return {
    children: `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`,
  };
}
const CustomAvatar = ({ name, lastName }: any) => {
  const fullName = `${name} ${lastName}`;
  return <Avatar {...stringAvatar(fullName)} />;
};

export default CustomAvatar;
