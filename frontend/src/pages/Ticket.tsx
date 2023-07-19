import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, reset as notesReset } from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Note } from "../utils/Note.model";
import { FaPlus } from "react-icons/fa";

import Modal from "react-modal";
import BackButton from "../components/ui/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";
import Button from "../components/ui/Button";
import TextArea from "../components/formFields/TextArea";

// Activate Modal into page
Modal.setAppElement("#root");

function Ticket() {
  const [modalOpen, setModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

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

  // Open Modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId as string));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  const onNoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");
    closeModal();
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
      {ticket.status !== "closed" && (
        <Button onClick={openModal} text="Add Note" className="btn">
          <FaPlus />
        </Button>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "600px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            position: "relative",
          },
        }}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <Button className="btn-close" text="X" onClick={closeModal} />
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <TextArea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              onChange={(e) => setNoteText(e.target.value)}
              value={noteText}
            />
          </div>
          <div className="form-group">
            <Button type="submit" className="btn" text="Submit" />
          </div>
        </form>
      </Modal>

      {notes.map((note: Note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== "closed" && (
        <Button
          text="Close Ticket"
          onClick={onTicketClose}
          className="btn btn-block btn-danger"
        ></Button>
      )}
    </div>
  );
}

export default Ticket;
