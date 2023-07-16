import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import SelectInput from "../components/formFields/SelectInput";
import TextArea from "../components/formFields/TextArea";
import { INewTicket } from "../utils/NewTicket.model";
import Button from "../components/ui/Button";

const productOptions = [
  { text: "Select a product", value: "", disabled: true },
  { text: "iPhone", value: "iPhone" },
  { text: "Macbook Pro", value: "Macbook Pro" },
  { text: "iMac", value: "iMac" },
  { text: "iPad", value: "iPad" },
];

function NewTicket() {
  const { user } = useSelector((state: RootState) => state.auth) as {
    user: INewTicket | null;
  };
  const [newTicket, setNewTicket] = useState<INewTicket>({
    name: user?.name,
    email: user?.email,
    product: "",
    description: "",
  } as INewTicket);

  const { name, email, product, description } = newTicket;

  const onChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setNewTicket((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    return {};
  };

  return (
    <>
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
              selectValue={product}
              options={productOptions}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <TextArea
              name="description"
              id="description"
              placeholder="Description"
              textAreaValue={description}
              onChange={onChange}
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
