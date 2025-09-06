import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Repair', 'User'],
  endpoints: (builder) => ({
    // Example endpoint
    getRepairs: builder.query<unknown[], void>({
      query: () => '/repairs',
      providesTags: ['Repair'],
    }),
  }),
})

export const { useGetRepairsQuery } = api
