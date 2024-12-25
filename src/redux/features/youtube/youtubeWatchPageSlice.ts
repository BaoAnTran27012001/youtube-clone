import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
import { HomeVideoCard, IWatchPageData } from "../../../utils/types";
export interface HomeVideoState {
  loading: boolean;
  data: Array<any>;
  activities:Array<any>,
  minicardlist:Array<any>,
  commentThreats:Array<any>,
  error: string | undefined;
}
const initialState: HomeVideoState = {
  loading: false,
  data: [],
  activities:[],
  minicardlist:[],
  commentThreats:[],
  error: undefined,
}
export const fetchWatchPage = createAsyncThunk(
  "youtube/fetchWatchPage",
  (videoId:string|undefined) => {
   
    const res = axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`)
    
    return res;
  }
)
export const fetchWatchPageListVideos = createAsyncThunk(
  "youtube/fetchWatchPageListVideos",
  (videoId:string|undefined) => {
   
    const res = axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`)
    
    return res;
  }
)
export const fetchActivities = createAsyncThunk(
  "youtube/fetchActivities",
  (channelId:string|undefined) => {
   
    const res = axios.get(`https://www.googleapis.com/youtube/v3/activities?key=${API_KEY}&part=snippet,contentDetails&channelId=${channelId}&maxResults=20`)
    
    return res;
  }
)
export const fetchCommentThreats = createAsyncThunk(
  "youtube/fetchCommentThreats",
  (videoId:string|undefined) => {
   
    const res = axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&part=snippet,replies&videoId=${videoId}&maxResults=20`)
    
    return res;
  }
)
const youtubeWatchPageSlice = createSlice({
  name: 'youtubeWatchPage',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchWatchPage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWatchPage.fulfilled, (state, action: PayloadAction<Array<HomeVideoCard>>) => {
      state.loading = false;
      state.data = action.payload?.data?.items[0];
      state.error = undefined
    });
    builder.addCase(fetchWatchPage.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });


    // Fetch All Activities To Get All Mini Card Videos 
    builder.addCase(fetchActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchActivities.fulfilled, (state, action: PayloadAction<Array<HomeVideoCard>>) => {
      state.loading = false;
      state.activities = action.payload?.data?.items;
      state.error = undefined
    });
    builder.addCase(fetchActivities.rejected, (state, action) => {
      state.loading = false;
      state.activities = [];
      state.error = action.error.message;
    });


    // Get All Mini Card Video From Activities
    builder.addCase(fetchWatchPageListVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWatchPageListVideos.fulfilled, (state, action: PayloadAction<Array<HomeVideoCard>>) => {
      state.loading = false;
      state.minicardlist = action.payload?.data?.items;
      state.error = undefined
    });
    builder.addCase(fetchWatchPageListVideos.rejected, (state, action) => {
      state.loading = false;
      state.minicardlist = [];
      state.error = action.error.message;
    });

    // Get All Comments Threat Of A Video


    builder.addCase(fetchCommentThreats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCommentThreats.fulfilled, (state, action: PayloadAction<Array<HomeVideoCard>>) => {
      state.loading = false;
      state.commentThreats = action.payload.data?.items;
      state.error = undefined
    });
    builder.addCase(fetchCommentThreats.rejected, (state, action) => {
      state.loading = false;
      state.commentThreats = [];
      state.error = action.error.message;
    });
  },
  reducers: {
  }
})
export const youtubeWatchPageSelector = (state: RootState) => state.youtubeWatchPageReducer;
export default youtubeWatchPageSlice.reducer;