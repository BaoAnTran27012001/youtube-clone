import { configureStore,  } from "@reduxjs/toolkit";
import userReducer from "./features/test/userSlice";
import youtubeReducer from "./features/youtube/youtubeSlice";
import categoryReducer from "./features/youtube/youtubeCategoriesSlice";
import youtubeWatchPageReducer from './features/youtube/youtubeWatchPageSlice'
import playlistReducer from './features/youtube/playlistSlice'
export const store = configureStore({
  reducer: {
    userReducer,
    youtubeReducer,
    categoryReducer,
    youtubeWatchPageReducer,
    playlistReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;