import { FormEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/store";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import SelectInput from "../components/formFields/SelectInput";
import TextArea from "../components/formFields/TextArea";
import Button from "../components/ui/Button";
import BackButton from "../components/ui/BackButton";
import Spinner from "../components/Spinner";

const productOptions = [
  { text: "Select a product", value: "", disabled: true },
  { text: "iPhone", value: "iPhone" },
  { text: "Macbook Pro", value: "Macbook Pro" },
  { text: "iMac", value: "iMac" },
  { text: "iPad", value: "iPad" },
];

function NewTicket() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [name] = useState(user?.name);
  const [email] = useState(user?.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const { isError, isLoading, isSuccess, message } = useSelector(
    (state: RootState) => state.tickets
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
    }

    dispatch(reset());
  }, [isError, message, isSuccess, dispatch, navigate]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      setProduct("");
      setDescription("");
      navigate("/tickets");
    }
  }, [isSuccess, dispatch, navigate]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <SelectInput
              name="product"
              id="product"
              value={product}
              options={productOptions}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <TextArea
              name="description"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default NewTicket;
