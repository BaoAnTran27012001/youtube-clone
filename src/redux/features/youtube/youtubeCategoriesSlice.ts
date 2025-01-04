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
  homeCategories: Array<User>;
  error: string | undefined;
}
const initialState = {
  loading: false,
  filterTag:"home",
  homeCategories: [],
  otherSidbarCategories:{
    music:{videos:[],nextPageToken:undefined},
    sports:{videos:[],nextPageToken:undefined},
    gaming:{videos:[],nextPageToken:undefined},
    movies:{videos:[],nextPageToken:undefined},
    news:{videos:[],nextPageToken:undefined},
    fashion:{videos:[],nextPageToken:undefined},
    course:{videos:[],nextPageToken:undefined},
  },
  error: undefined,
}
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  () => {
    const res = instance.get(`/v3/videoCategories?key=${API_KEY}&part=snippet&regionCode=us`)
    
    return res;
  }
)
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Array<User>>) => {
      state.loading = false;
      state.homeCategories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.homeCategories = [];
      state.error = action.error.message;
    });
  },
  reducers: {
    changeFilterTag: (state,action:PayloadAction<string>) => {
      state.filterTag = action.payload
      
    },
  }
})
export const categoryDataSelector = (state: RootState) => state.categoryReducer;
export const { changeFilterTag } = categorySlice.actions
export default categorySlice.reducer;