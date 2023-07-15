import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setCheckingAuthStatus(false);
  }, [user]);

  return { isLoggedIn, checkingAuthStatus };
}

export default useAuthStatus;
