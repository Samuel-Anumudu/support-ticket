import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

import Spinner from "./Spinner";

function PrivateRoute() {
  const { isLoggedIn, checkingAuthStatus } = useAuthStatus();

  if (checkingAuthStatus) {
    return <Spinner />;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
