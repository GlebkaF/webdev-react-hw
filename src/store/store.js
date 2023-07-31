import { configureStore } from '@reduxjs/toolkit'
import audioplayerReducer from './slice/audioplayer/reducer'

export const store = configureStore({
  reducer: {
    audioplayer: audioplayerReducer,
  },
})
