import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import instance from "../../../api/api";
import { HomeVideoCard, IHomeChannelData } from "../../../utils/types";
import { RootState } from "../../store";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
export interface HomeVideoState {
  loading: boolean;
  data: Array<HomeVideoCard>;
  pageToken:string
  channels:Array<IHomeChannelData>,
  isSwitchCategory:boolean,
  error: string | undefined;
}
const initialState: HomeVideoState = {
  loading: false,
  data: [],
  channels:[],
  pageToken:"",
  isSwitchCategory:false,
  error: undefined,
}
export const fetchYoutubePopular = createAsyncThunk(
  "youtube/fetchYoutubePopular",
  (paramterObject:{categoryId:string|null,pageToken:string|null|undefined}) => {
   
    const res = instance.get(`/v3/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&chart=mostPopular&${paramterObject.categoryId !== null ? `videoCategoryId=${paramterObject.categoryId}`:``}&${paramterObject.pageToken ? `pageToken=${paramterObject.pageToken}`:``}&maxResults=10`)
    
    return res;
  }
)

export const fetchYoutubeChannels = createAsyncThunk(
  "youtube/fetchYoutubeChannels",
  (channelIds:string|undefined) => {
    const res = instance.get(`/v3/channels?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${channelIds}`)
    
    return res;
  }
)
const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchYoutubePopular.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchYoutubePopular.fulfilled, (state, action: PayloadAction<Array<HomeVideoCard>>) => {
      state.loading = false;
      state.data = state.isSwitchCategory ? action.payload?.data?.items : [...state.data,...action.payload?.data?.items];
      state.pageToken = action.payload?.data?.nextPageToken;
      state.error = undefined
    });
    builder.addCase(fetchYoutubePopular.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchYoutubeChannels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchYoutubeChannels.fulfilled, (state, action: PayloadAction<Array<string>>) => {
      
      state.loading = false;
      state.channels = action.payload?.data?.items;
    });
    builder.addCase(fetchYoutubeChannels.rejected, (state, action) => {
    
      state.loading = false;
      state.channels = [];
      state.error = action.error.message;
    });
  },
  reducers: {
    toggleSwitchCategory: (state,action:PayloadAction<boolean>) => {
      state.isSwitchCategory = action.payload
    },
  }
})
export const homeVideoDataSelector = (state: RootState) => state.youtubeReducer;
export const { toggleSwitchCategory } = youtubeSlice.actions
export default youtubeSlice.reducer;