import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export const useUserContext = () => useContext(UserContext);
