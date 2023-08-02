import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const FAVORITE_TAG = { type: 'Favorites', id: 'Favorites' }

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
      query: (token) => ({
        url: '/catalog/track/favorite/all/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: () => [FAVORITE_TAG],
    }),
    likeTrack: builder.mutation({
      query: ({ id, token }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [FAVORITE_TAG],
    }),
    dislikeTrack: builder.mutation({
      query: ({ id }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetMainPlaylistQuery,
  useGetMyPlaylistQuery,
  useLikeTrackMutation,
  useDislikeTrackMutation,
} = playlistApi
