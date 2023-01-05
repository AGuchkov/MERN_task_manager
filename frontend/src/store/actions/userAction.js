import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'
import { toast } from 'react-toastify'

export const userLogin = createAsyncThunk('auth/userLogin', async (params) => {
  try {
    const { userEmail, password } = params
    const { data } = await api.post('/auth/login', { userEmail, password })
    localStorage.setItem('token', data.token)
    toast.success(data.message)
    return data
  } catch (e) {
    const message = e.response?.data?.message || e.message;
    toast.error(message)
    throw e
  }
})

export const userRegister = createAsyncThunk('auth/userRegister', async (params) => {
  try {
    const { userEmail, userName, password } = params
    const { data } = await api.post('/auth/registration', { userEmail, userName, password })
    localStorage.setItem('token', data.token)
    toast.success(data.message)
    return data
  } catch (e) {
    const message = e.response?.data?.message || e.message;
    toast.error(message)
    throw e
  }
})

export const userIsAuth = createAsyncThunk('auth/userIsAuth', async () => {
  const token = localStorage.getItem('token')
  const { data } = await api.get('/auth', { headers: { "Authorization": `Bearer ${token}` } })
  return data
})