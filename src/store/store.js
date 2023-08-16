import { combineReducers, configureStore } from '@reduxjs/toolkit'
import audioplayerReducer from './slice/audioplayer/reducer'
import { playlistApi } from '../api/playlist'
import { authReducer } from './auth'

export const store = configureStore({
  reducer: combineReducers({
    audioplayer: audioplayerReducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    auth: authReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(playlistApi.middleware),
})
