import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  tagTypes: ['User', 'Task'],
  endpoints: (builder) => ({
    getAllStage: builder.query({
      query: () => ({
        url: '/stages',
        headers: { Authorization: localStorage.getItem('token') },
      })
    }),
    getAllRoles: builder.query({
      query: () => ({
        url: '/roles',
        headers: { Authorization: localStorage.getItem('token') },
      })
    }),
    getAllUser: builder.query({
      query: () => ({
        url: '/users',
        headers: { Authorization: localStorage.getItem('token') },
      }),
      providesTags: result => ['User'],
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: `/users/${data.userId}`,
        method: 'PATCH',
        headers: { Authorization: localStorage.getItem('token') },
        body: data.formData
      }),
      invalidatesTags: ['User']
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
        headers: { Authorization: localStorage.getItem('token') },
      }),
      invalidatesTags: ['User']
    }),
    getAllTask: builder.query({
      query: () => ({
        url: '/tasks',
        headers: { Authorization: localStorage.getItem('token') },
      }),
      providesTags: result => ['Task']
    }),
    addNewTask: builder.mutation({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        headers: { Authorization: localStorage.getItem('token') },
        body: data
      }),
      invalidatesTags: ['Task']
    }),
    editTask: builder.mutation({
      query: (data) => ({
        url: `/tasks/${data.taskId}`,
        method: 'PATCH',
        headers: { Authorization: localStorage.getItem('token') },
        body: data.formData
      }),
      invalidatesTags: ['Task']
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
        headers: { Authorization: localStorage.getItem('token') },
      }),
      invalidatesTags: ['Task']
    }),
  }),
})