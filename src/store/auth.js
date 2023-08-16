import { createSlice } from '@reduxjs/toolkit'
const AUTH_KEY = 'auth'

function getAuthFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY))
  } catch (error) {
    console.error(error)
    return null
  }
}

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

  initialState: getAuthFromLocalStorage() ?? initialState,
  reducers: {
    setAuth(state, action) {
      const payload = action.payload ?? initialState

      state.id = payload.id
      state.email = payload.email
      state.username = payload.username
      state.access = payload.access
      state.refresh = payload.refresh
      state.first_name = payload.first_name
      state.last_name = payload.last_name

      localStorage.setItem(AUTH_KEY, JSON.stringify(state))
    },
  },
})
export const { setAuth } = authSlice.actions
export const authReducer = authSlice.reducer
