import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  video: null,
  active: null,
  Porcentage: 0
}

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    getVideos: (state, action) => {

      state.video = action.payload
    },
    nuevoVideo: (state, action) => {

        state.video = [...state.video, action.payload]
    },
    upload: (state, action) => {
      state.Porcentage = action.payload
    },
    uploadFinish: (state) => {
      state.Porcentage = 0
    },
    activeVideo: (state, action) => {
      state.active = action.payload
    },
    clearActiveVideo: (state) => {
      state.active = null
    },
    updateVideo: (state, action) => {
      state.video = state.video.map( 
        e => (e._id === action.payload._id) ? action.payload : e
      )
    },
    deleteVideo: (state, action) => {
      state.video = state.video.filter( 
        e => (e._id !== action.payload._id)
      )
    }
  },
})

// Action creators are generated for each case reducer function
export const { getVideos, nuevoVideo, upload, uploadFinish, activeVideo, clearActiveVideo, deleteVideo, updateVideo } = videosSlice.actions