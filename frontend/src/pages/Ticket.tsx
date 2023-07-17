import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { getTicket, reset } from "../features/tickets/ticketSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import BackButton from "../components/ui/BackButton";
import Spinner from "../components/Spinner";

function Ticket() {
  const { isError, isLoading, message, ticket } = useSelector(
    (state: RootState) => state.tickets
  );

  const { ticketId } = useParams();

  const dispatch = useAppDispatch();

  const computedDate = new Date(ticket.createdAt!).toLocaleString("en-US");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId as string));
    return () => {
      dispatch(reset());
    };
  }, [isError, message, ticketId, dispatch]);

  if (isLoading) return <Spinner />;

  if (isError) return <h3>Something Went Wrong</h3>;

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {computedDate}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  );
}

export default Ticket;
