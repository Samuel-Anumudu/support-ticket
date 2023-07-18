export interface Note {
  _id?: string;
  user?: string;
  ticket?: string;
  text: string;
  isStaff?: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
