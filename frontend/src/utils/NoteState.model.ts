import { Note } from "./Note.model";
export interface NoteState {
  notes: Note[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
