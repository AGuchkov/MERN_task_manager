import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userRegister, userIsAuth } from '../actions/userAction'

const initialState = {
  loading: false,
  userData: {},
  isLoggedIn: false,
  errorMsg: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false
      state.userData = {}
      state.isLoggedIn = false
      state.errorMsg = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true
    })
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false
      state.errorMsg = ''
      state.userData = action.payload
      state.isLoggedIn = true
    })
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false
      state.userData = {}
      state.errorMsg = 'Ошибка при авторизации'
      state.isLoggedIn = false
    })
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true
    })
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false
      state.errorMsg = ''
      state.userData = action.payload
      state.isLoggedIn = true
    })
    builder.addCase(userRegister.rejected, (state) => {
      state.loading = false
      state.userData = {}
      state.errorMsg = 'Ошибка при регистрации'
      state.isLoggedIn = false
    })
    builder.addCase(userIsAuth.pending, (state) => {
      state.loading = true
    })
    builder.addCase(userIsAuth.fulfilled, (state, action) => {
      state.loading = false
      state.errorMsg = ''
      state.userData = action.payload
      state.isLoggedIn = true
    })
    builder.addCase(userIsAuth.rejected, (state) => {
      state.loading = false
      state.userData = {}
      state.errorMsg = 'Ошибка при авторизации'
      state.isLoggedIn = false
    })
  }
})

export const { logout } = userSlice.actions

export default userSlice.reducer