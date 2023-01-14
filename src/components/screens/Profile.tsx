import { MainLayout } from "../layouts";
import { REACT_APP_CIBUS_API } from "../../constants";
import useCookie from "../../hooks/useCookie";
import useSWR from "swr";
import { fetcher } from "../../helpers";
import { User } from "../../types";

const Profile = () => {
  const [tokenCookie] = useCookie("USER_ACCESS_TOKEN");

  const { data: user } = useSWR<User>(
    [`${REACT_APP_CIBUS_API}/user`, tokenCookie],
    () => fetcher(`${REACT_APP_CIBUS_API}/user`, tokenCookie as string)
  );

  return (
    <MainLayout>
      Profile of {user?.name} {user?.last_name}
    </MainLayout>
  );
};

export default Profile;
