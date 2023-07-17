export interface Ticket {
  createdAt?: string | Date;
  _id?: string;
  status?: string;
  user?: string;
  product: string;
  description: string;
  updatedAt?: string | Date;
}
