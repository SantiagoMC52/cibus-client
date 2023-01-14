import { useUserContext } from "../../hooks/contexts";
import { MainLayout } from "../layouts";

const Profile = () => {
  const { user } = useUserContext();

  return (
    <MainLayout>
      Profile of {user?.name} {user?.last_name}
    </MainLayout>
  );
};

export default Profile;
