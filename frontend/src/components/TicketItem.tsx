import { Ticket } from "../utils/Ticket.model";
import { Link } from "react-router-dom";
function TicketItem({ ticket }: { ticket: Ticket }) {
  const { product, status, _id, createdAt } = ticket;
  const computedDate = new Date(createdAt!).toLocaleString("en-US");

  return (
    <div className="ticket">
      <div>{computedDate}</div>
      <div>{product}</div>
      <div className={`status status-${status}`}>{status}</div>
      <Link to={`/ticket/${_id}`} className="btn  btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}

export default TicketItem;
