import axios from "axios";
import { RegisterUser, LoginUser } from "../../utils/User.Model";

const API_URL = "/api/users/";

// Register User
const register = async (userData: RegisterUser) => {
  const res = await axios.post(API_URL, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

// Login User
const login = async (userData: LoginUser) => {
  const res = await axios.post(API_URL + "login", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = { register, login, logout };

export default authService;
