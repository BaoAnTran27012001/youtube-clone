import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import instance from "../../../api/api";
import { RootState } from "../../store";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
interface User {
  id: string,
  name: string,
  email: string
}
export interface UserState {
  loading: boolean;
  searchVideos: Array<User>;
  error: string | undefined;
}
const initialState: UserState = {
  loading: false,
  searchVideos: [],
  error: undefined,
}
export const fetchSearchVideos = createAsyncThunk(
  "search/fetchSearchVideos",
  (query:string) => {
    const res = instance.get(`/v3/search?key=${API_KEY}&part=snippet&q=${query}&maxResults=20`)
    
    return res;
  }
)
const searchVideoSlice = createSlice({
  name: 'search',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSearchVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearchVideos.fulfilled, (state, action: PayloadAction<Array<User>>) => {
      state.loading = false;
      state.searchVideos = action.payload;
    });
    builder.addCase(fetchSearchVideos.rejected, (state, action) => {
      state.loading = false;
      state.searchVideos = [];
      state.error = action.error.message;
    });
  },
  reducers: {}
})
export const searchSelector = (state: RootState) => state.searchReducer;
export default searchVideoSlice.reducer;