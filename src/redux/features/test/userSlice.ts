import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
interface User {
  id: string,
  name: string,
  email: string
}
export interface UserState {
  loading: boolean;
  users: Array<User>;
  error: string | undefined;
}
const initialState: UserState = {
  loading: false,
  users: [],
  error: undefined,
}
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  () => {
    const res = axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet&chart=mostPopular&maxResults=20`)
    
    return res;
  }
)
const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<Array<User>>) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
  reducers: {}
})
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;