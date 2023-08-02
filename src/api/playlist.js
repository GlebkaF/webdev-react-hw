import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://painassasin.online',
  }),
  endpoints: (builder) => ({
    getMainPlaylist: builder.query({
      query: () => '/catalog/track/all/',
    }),
    getMyPlaylist: builder.query({
      query: () => '/catalog/track/favorite/all/',
    }),
  }),
})

export const { useGetMainPlaylistQuery, useGetMyPlaylistQuery } = playlistApi
