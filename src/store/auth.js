import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  id: 0,
  email: '',
  access: '',
  refresh: '',
  first_name: '',
  last_name: '',
}

const authSlice = createSlice({
  name: 'auth',

  initialState,
  reducers: {
    setAuth(state, action) {
      const payload = action.payload ?? initialState

      state.id = payload.id
      state.email = payload.email
      state.access = payload.access
      state.refresh = payload.refresh
      state.first_name = payload.first_name
      state.last_name = payload.last_name
    },
  },
})
export const { setAuth } = authSlice.actions
export const authReducer = authSlice.reducer
