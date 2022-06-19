import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  image: null,
  active: null,
  Porcentage: 0
}

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    getImages: (state, action) => {

      state.image = action.payload
    },
    nuevaImagen: (state, action) => {

        state.image = [...state.image, action.payload]
    },
    upload: (state, action) => {
      state.Porcentage = action.payload
    },
    uploadFinish: (state) => {
      state.Porcentage = 0
    },
    activeImage: (state, action) => {
      state.active = action.payload
    },
    clearActiveImage: (state) => {
      state.active = null
    },
    updateImage: (state, action) => {
      state.image = state.image.map( 
        e => (e._id === action.payload._id) ? action.payload : e
      )
    },
    deleteImage: (state, action) => {
      state.image = state.image.filter( 
        e => (e._id !== action.payload._id)
      )
    }
  },
})

// Action creators are generated for each case reducer function
export const { getImages, nuevaImagen, upload, uploadFinish, activeImage, clearActiveImage, deleteImage, updateImage } = imagesSlice.actions