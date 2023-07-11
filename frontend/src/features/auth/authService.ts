import axios from "axios";
import { RegisterUser } from "../../utils/User.Model";

const API_URL = "/api/users";

const register = async (userData: RegisterUser) => {
  const res = await axios.post(API_URL, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const authService = { register };

export default authService;
