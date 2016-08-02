/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import update from 'react/lib/update'
import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_RESULT,
  FETCH_PROFILE_ERROR,
  UPDATE_PROFILE_FIELD,
  UPDATE_AVATAR_FIELDS,
  UPDATE_LAYOUT_FIELD,
  ADD_PROFILE_TECHICON,
  ADD_PROFILE_LINK,
  REMOVE_PROFILE_ITEM,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_RESET
} from '../actions/index'

const profile = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        errMessage: null
      })
    case FETCH_PROFILE_RESULT:
      return Object.assign({}, state, {
        loading: false,
        hasLoaded: true,
        error: null,
        errMessage: null,
        data: action.payload
      })
    case FETCH_PROFILE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        hasLoaded: false,
        error: true,
        errMessage: action.payload
      })
    case UPDATE_PROFILE_FIELD:
      return update(state, {
        data: {
          [action.fieldName]: { $set: action.fieldValue }
        }
      })
    case UPDATE_AVATAR_FIELDS:
      return update(state, {
        data: {
          avatar: {
            use: { $set: action.use },
            gravitarEmail: { $set: action.gravitarEmail }
          },
          customAvatarFile: { $set: action.customAvatarFile }
        }
      })
    case UPDATE_LAYOUT_FIELD:
      return update(state, {
        data: {
          layout: {
            [action.fieldName]: { $set: action.fieldValue }
          }
        }
      })
    case ADD_PROFILE_TECHICON:
      return update(state, {
        data: {
          [action.linkGroup]: {$push: [{ name: action.linkName, icon: action.linkIcon }]}
        }
      })
    case ADD_PROFILE_LINK:
      return update(state, {
        data: {
          [action.linkGroup]: {$push: [{ name: action.linkName, url: action.linkUrl }]}
        }
      })
    case REMOVE_PROFILE_ITEM:
      return update(state, {
        data: {
          [action.linkGroup]: {$splice: [[action.index, 1]]}
        }
      })
    case EDIT_PROFILE:
      return Object.assign({}, state, {
        editProfileLoading: true,
        editProfileSuccess: null,
        editProfileErrMessage: null,
        editProfileError: null
      })
    case EDIT_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        editProfileLoading: false,
        editProfileErrMessage: null,
        editProfileError: null,
        editProfileSuccess: true
      })
    case EDIT_PROFILE_FAIL:
      return Object.assign({}, state, {
        editProfileErrMessage: action.payload,
        editProfileLoading: false,
        editProfileError: true,
        editProfileSuccess: null
      })
    case EDIT_PROFILE_RESET:
      return Object.assign({}, state, {
        editProfileLoading: false,
        editProfileSuccess: null,
        editProfileErrMessage: null,
        editProfileError: null
      })
    default:
      return state
  }
}

export default profile
