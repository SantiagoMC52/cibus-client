import { useContext } from "react";
import { UserContext } from "../contexts/userContexts";

export const useUserContext = () => useContext(UserContext);
