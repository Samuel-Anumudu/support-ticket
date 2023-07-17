import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../app/store";
import { getTickets, reset } from "../features/tickets/ticketSlice";
import { Ticket } from "../utils/Ticket.model";
import Spinner from "../components/Spinner";
import BackButton from "../components/ui/BackButton";
import TicketItem from "../components/TicketItem";

function Tickets() {
  const { isError, isLoading, isSuccess, tickets } = useSelector(
    (state: RootState) => state.tickets
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch, isSuccess]);

  if (isLoading) return <Spinner />;

  if (isError) return <h3>Something Went Wrong</h3>;

  return (
    <>
      <BackButton url="/" />
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.length ? (
          tickets.map((ticket: Ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))
        ) : (
          <h3>You have no tickets to view. Please create a ticket</h3>
        )}
      </div>
    </>
  );
}

export default Tickets;
