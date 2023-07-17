import { Ticket } from "./Ticket.model";
export interface TicketState {
  tickets: Ticket[];
  ticket: Ticket;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
