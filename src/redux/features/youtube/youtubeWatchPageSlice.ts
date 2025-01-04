import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
import { HomeVideoCard, IWatchPageData } from "../../../utils/types";
import instance from "../../../api/api";
export interface HomeVideoState {
  isShowMoreComments:boolean,
  loading: boolean;
  data: Array<any>;
  activities:Array<any>,
  minicardlist:Array<any>,
  commentThreats:{
    data:Array<any>,
    loading:boolean
  },
  commentReplies:{
    data:Array<any>,
    loading:boolean
  },
  commentThreadsNextPageToken:string,
  error: string | undefined;
}
const initialState: HomeVideoState = {
  isShowMoreComments:false,
  loading: false,
  data: [],
  activities:[],
  minicardlist:[],
  commentThreats:{
    data:[],
    loading:false
  },
  commentReplies:{
    data:[],
    loading:false
  },
  commentThreadsNextPageToken:"",
  error: undefined,
}
export const fetchWatchPage = createAsyncThunk(
  "youtube/fetchWatchPage",
  (videoId:string|undefined) => {
   
    const res = instance.get(`/v3/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`)
    
    return res;
  }
)
export const fetchWatchPageListVideos = createAsyncThunk(
  "youtube/fetchWatchPageListVideos",
  (videoId:string|undefined) => {
   
    const res = instance.get(`/v3/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`)
    
    return res;
  }
)
export const fetchActivities = createAsyncThunk(
  "youtube/fetchActivities",
  (channelId:string|undefined) => {
   
    const res = instance.get(`/v3/activities?key=${API_KEY}&part=snippet,contentDetails&channelId=${channelId}&maxResults=10`)
    
    return res;
  }
)
export const fetchCommentThreats = createAsyncThunk(
  "youtube/fetchCommentThreats",
  (commentDataObj:object) => {
   
    const res = instance.get(`/v3/commentThreads?key=${API_KEY}&part=snippet,replies&videoId=${commentDataObj.videoId}${commentDataObj.nextPageToken ? `&pageToken=${commentDataObj.nextPageToken}`:''}&maxResults=10`)
    
    return res;
  }
)
export const fetchCommentsReplies = createAsyncThunk(
  "youtube/fetchCommentsReplies",
  (commentId:string|undefined) => {
   
    const res = instance.get(`/v3/comments?key=${API_KEY}&part=snippet&parentId=${commentId}`)
    
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
      state.commentThreats.loading = false;
      state.commentThreats.data = state.isShowMoreComments ? [...state.commentThreats,...action.payload.data.items]:action.payload.data.items;
      state.commentThreadsNextPageToken = action.payload.data.nextPageToken
      state.error = undefined
    });
    builder.addCase(fetchCommentThreats.rejected, (state, action) => {
      state.commentThreats.loading = false;
      state.commentThreats.data = [];
      state.error = action.error.message;
    });


    // Get All Comments Replies

    builder.addCase(fetchCommentsReplies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCommentsReplies.fulfilled, (state, action: PayloadAction<Array<HomeVideoCard>>) => {
      state.commentReplies.loading = false;
      state.commentReplies.data = action.payload.data?.items;
      state.error = undefined
    });
    builder.addCase(fetchCommentsReplies.rejected, (state, action) => {
      state.commentReplies.loading = false;
      state.commentReplies.data = [];
      state.error = action.error.message;
    });


  },
  reducers: {
    toggleIsShowMoreComments: (state,action:PayloadAction<boolean>) => {
      state.isShowMoreComments = action.payload
    },
    toggleIsShowMoreChannelVideos: (state,action:PayloadAction<boolean>) => {
      state.isShowMoreComments = action.payload
    },
  }
})
export const youtubeWatchPageSelector = (state: RootState) => state.youtubeWatchPageReducer;
export const { toggleIsShowMoreComments } = youtubeWatchPageSlice.actions
export default youtubeWatchPageSlice.reducer;