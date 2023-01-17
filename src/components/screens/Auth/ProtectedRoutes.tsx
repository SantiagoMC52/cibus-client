import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCookie } from "../../../hooks";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const [tokenCookie] = useCookie("USER_ACCESS_TOKEN");

  const location = useLocation();

  if (!tokenCookie) {
    return <Navigate to="/login" state={{ location }} />;
  }
  return <>{children}</>;
};
export default ProtectedRoutes;
