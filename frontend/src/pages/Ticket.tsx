import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, reset as notesReset } from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Note } from "../utils/Note.model";
import BackButton from "../components/ui/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

function Ticket() {
  const { isError, isLoading, message, ticket } = useSelector(
    (state: RootState) => state.tickets
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state: RootState) => state.notes
  );

  const { ticketId } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const computedDate = new Date(ticket.createdAt!).toLocaleString("en-US");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId as string));
    dispatch(getNotes(ticketId as string));

    return () => {
      dispatch(reset());
      dispatch(notesReset());
    };
  }, [isError, message, ticketId, dispatch]);

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId as string));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  if (isLoading || notesIsLoading) return <Spinner />;

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
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {notes.map((note: Note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
