import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { RootState, useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

interface IFormData {
  email: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const dispatch = useAppDispatch();

  const { user, isLoading, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData));
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p className="">Please log in to get support</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
