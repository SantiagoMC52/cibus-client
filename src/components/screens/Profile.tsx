import { Container, Typography } from "@mui/material";
import { useUserContext } from "../../hooks/contexts";
import { MainLayout } from "../layouts";

const Profile = () => {
  const { user } = useUserContext();

  return (
    <MainLayout>
      <Container>
        <Typography variant="h4">Perfil</Typography>
        Nombre: {user?.name} {user?.last_name}
      </Container>
    </MainLayout>
  );
};

export default Profile;
