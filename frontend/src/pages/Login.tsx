import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Button from "../components/ui/Button";
import TextInput from "../components/formFields/TextInput";

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
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

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

  if (isLoading) return <Spinner />;

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
            <TextInput
              type="email"
              className="form-control"
              id="email"
              name="email"
              textValue={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <TextInput
              type="password"
              className="form-control"
              id="password"
              name="password"
              textValue={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <Button className="btn btn-block" text="Submit" />
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
