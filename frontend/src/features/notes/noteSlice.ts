import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NoteState } from "../../utils/NoteState.model";
import noteService from "./noteService";
import { RootState } from "../../app/store";

const initialState: NoteState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get ticket notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (ticketId: string, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      return await noteService.getNotes(ticketId, token as string);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create ticket note
export const createNote = createAsyncThunk(
  "notes/create",
  async (
    { noteText, ticketId }: { noteText: string; ticketId: string },
    thunkAPI
  ) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      return await noteService.createNote(noteText, ticketId, token as string);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
