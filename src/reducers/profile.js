/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_RESULT,
  FETCH_PROFILE_ERROR
} from '../actions/index'

const profile = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
    case FETCH_PROFILE_RESULT:
    case FETCH_PROFILE_ERROR:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default profile
