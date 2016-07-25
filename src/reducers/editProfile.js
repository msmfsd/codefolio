/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import {
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL
} from '../actions/index'

const editProfile = (state = {}, action) => {
  switch (action.type) {
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
    default:
      return state
  }
}

export default editProfile
