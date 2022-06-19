import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth/authSlice'
import { imagesSlice } from './slices/images/imagesSlice'
import { videosSlice } from './slices/videos/videosSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    images: imagesSlice.reducer,
    videos: videosSlice.reducer
  },
})