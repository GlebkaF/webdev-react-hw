import { remove } from 'lodash'
import {
  DISLIKE_TRACK,
  LIKE_TRACK,
  NEXT_TRACK,
  PAUSE,
  PLAY,
  PREV_TRACK,
  SET_CURRENT_TRACK,
  TOGGLE_SUFFLED,
} from './actions'

const initialState = {
  playing: false,
  playlist: [],
  track: null,
  shuffled: false,
  shuffledPlaylist: [],
}

export default function audioplayerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_TRACK: {
      return {
        ...state,
        playlist: action.payload.playlist,
        track: action.payload.track,
        shuffledPlaylist: [...action.payload.playlist].sort(
          () => 0.5 - Math.random(),
        ),
        playing: true,
      }
    }

    case NEXT_TRACK: {
      const playlist = state.shuffled ? state.shuffledPlaylist : state.playlist

      const currentTrackIndex = playlist.findIndex((track) => {
        return track.id === state.track.id
      })

      const newTrack = playlist[currentTrackIndex + 1]

      if (!newTrack) {
        return state
      }

      return {
        ...state,
        track: newTrack,
      }
    }

    case PREV_TRACK: {
      const playlist = state.shuffled ? state.shuffledPlaylist : state.playlist

      const currentTrackIndex = playlist.findIndex((track) => {
        return track.id === state.track.id
      })

      if (currentTrackIndex === 0) {
        return state
      }

      const newTrack = playlist[currentTrackIndex - 1]

      if (!newTrack) {
        return state
      }

      return {
        ...state,
        track: newTrack,
      }
    }

    case TOGGLE_SUFFLED: {
      return {
        ...state,
        shuffled: !state.shuffled,
        shuffledPlaylist: [...state.playlist].sort(() => 0.5 - Math.random()),
      }
    }

    case PLAY: {
      return {
        ...state,
        playing: true,
      }
    }

    case PAUSE: {
      return {
        ...state,
        playing: false,
      }
    }

    case DISLIKE_TRACK:
    case LIKE_TRACK: {
      const { id, auth } = action.payload

      const applyActionToTrack = (track) => {
        const staredWithoutCurrentUser = remove(
          ...track.stared_user,
          ({ id }) => auth.id === id,
        )

        const newStaredUsers =
          action.type === LIKE_TRACK
            ? [...staredWithoutCurrentUser, auth]
            : staredWithoutCurrentUser

        return {
          ...track,
          stared_user: newStaredUsers,
        }
      }

      return {
        ...state,
        track:
          state.track?.id === id
            ? applyActionToTrack(state.track)
            : state.track,
        playlist: state.playlist.map((item) =>
          item.id === id ? applyActionToTrack(item) : item,
        ),
        shuffledPlaylist: state.shuffledPlaylist.map((item) =>
          item.id === id ? applyActionToTrack(item) : item,
        ),
      }
    }

    default:
      return state
  }
}
