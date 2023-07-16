import axios from "axios";
import { Ticket } from "../../utils/Ticket.model";

const API_URL = "/api/tickets/";

// Create new ticket
const createTicket = async (ticketData: Ticket, token: string | any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

const ticketService = { createTicket };

export default ticketService;
