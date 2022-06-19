import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
name: 'auth',
initialState: {
    checking: true,
    uid: null,
    activeUser: null
},
reducers: {
login: (state, action ) => {
 state.checking = false
 state.uid = action.payload.uid
},
authChecking: (state) => {
    state.checking = false
},
logout: (state) => {
    state.checking = false
    state.uid = null
}
}
});
export const { login, authChecking, logout } = authSlice.actions;