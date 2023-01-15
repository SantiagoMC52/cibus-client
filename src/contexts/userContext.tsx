import { createContext, ReactNode } from "react";
import useSWR from "swr";
import { REACT_APP_CIBUS_API } from "../constants";
import { fetcher } from "../helpers";
import { useCookie } from "../hooks";
import { User } from "../types/user";

type UserContextType = {
  user?: User;
  isLogged: boolean;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  isLogged: false,
  isLoading: false,
} as UserContextType);

type Props = {
  children: ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [tokenCookie] = useCookie("USER_ACCESS_TOKEN");

  const { data: user, isLoading } = useSWR<User>(
    tokenCookie ? [`${REACT_APP_CIBUS_API}/user`, tokenCookie] : null,
    () => fetcher(`${REACT_APP_CIBUS_API}/user`, tokenCookie as string)
  );

  return (
    <UserContext.Provider value={{ user, isLoading, isLogged: Boolean(user) }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
