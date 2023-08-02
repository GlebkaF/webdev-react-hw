import { configureStore } from '@reduxjs/toolkit'
import audioplayerReducer from './slice/audioplayer/reducer'
import { playlistApi } from '../api/playlist'

export const store = configureStore({
  reducer: {
    audioplayer: audioplayerReducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(playlistApi.middleware),
})
