import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  createDislikeTrackAction,
  createLikeTrackAction,
} from '../store/slice/audioplayer/actions'

const TRACKS_TAG = 'Tracks'

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://painassasin.online',
  }),
  endpoints: (builder) => ({
    getMainPlaylist: builder.query({
      query: () => '/catalog/track/all/',
      providesTags: () => [TRACKS_TAG],
    }),
    getMyPlaylist: builder.query({
      query: ({ auth }) => ({
        url: '/catalog/track/favorite/all/',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response.map((item) => ({
          ...item,
          stared_user: [
            {
              id: arg.auth.id,
              username: arg.auth.username,
              first_name: arg.auth.first_name,
              last_name: arg.auth.last_name,
              email: arg.auth.email,
            },
          ],
        }))
      },
      providesTags: () => [TRACKS_TAG],
    }),
    getCategory: builder.query({
      query: ({ id }) => ({
        url: `/catalog/selection/${id}/`,
      }),
      providesTags: () => [TRACKS_TAG],
    }),
    likeTrack: builder.mutation({
      query: ({ id, token }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [TRACKS_TAG],
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            createLikeTrackAction({ id: args.id, auth: getState().auth }),
          )
        } catch (error) {
          console.error(error)
        }
      },
    }),
    dislikeTrack: builder.mutation({
      query: ({ id, token }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [TRACKS_TAG],
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            createDislikeTrackAction({ id: args.id, auth: getState().auth }),
          )
        } catch (error) {
          console.error(error)
        }
      },
    }),
  }),
})

export const {
  useGetMainPlaylistQuery,
  useGetMyPlaylistQuery,
  useLikeTrackMutation,
  useDislikeTrackMutation,
  useGetCategoryQuery,
} = playlistApi
