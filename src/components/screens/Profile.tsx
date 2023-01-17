import { useUserContext } from "../../hooks/contexts";
import { MainLayout } from "../layouts";

const Profile = () => {
  const { user, isLogged } = useUserContext();

  console.log("isLogged from Profile", isLogged);

  return (
    <MainLayout>
      Profile of {user?.name} {user?.last_name}
    </MainLayout>
  );
};

export default Profile;
