import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import instance from "../../../api/api";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
interface User {
  id: string,
  name: string,
  email: string
}
export interface UserState {
  loading: boolean;
  playlists: Array<User>;
  playlistvideos: Array<User>;
  error: string | undefined;
}
const initialState: UserState = {
  loading: false,
  playlists: [],
  playlistvideos:[],
  error: undefined,
}
export const fetchPlaylists = createAsyncThunk(
  "playlists/fetchPlaylists",
  (playlistObj:{channelId:string|undefined,nextPageToken?:string|undefined}) => {
    const res = instance.get(`/v3/playlists?key=${API_KEY}&part=snippet,contentDetails&channelId=${playlistObj.channelId}${playlistObj.nextPageToken ? `&pageToken=${playlistObj.nextPageToken}`:''}&maxResults=8`)
    
    return res;
  }
)
export const fetchPlaylistVideos = createAsyncThunk(
  "playlists/fetchPlaylistVideos",
  (playlistId:string|undefined) => {
    const res = instance.get(`/v3/playlists?key=${API_KEY}&part=snippet,contentDetails&id=${playlistId}&maxResults=8`)
    
    return res;
  }
)
const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<Array<User>>) => {
      state.loading = false;
      state.playlists = action.payload;
    });
    builder.addCase(fetchPlaylists.rejected, (state, action) => {
      state.loading = false;
      state.playlists = [];
      state.error = action.error.message;
    });




    builder.addCase(fetchPlaylistVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlaylistVideos.fulfilled, (state, action: PayloadAction<Array<User>>) => {
      state.loading = false;
      state.playlistvideos = action.payload;
    });
    builder.addCase(fetchPlaylistVideos.rejected, (state, action) => {
      state.loading = false;
      state.playlistvideos = [];
      state.error = action.error.message;
    });

  },
  reducers: {}
})
export const playlistDataSelector = (state: RootState) => state.playlistReducer;
export default playlistSlice.reducer;