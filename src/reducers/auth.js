/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import {
  AUTH_SET_LOGGED_IN,
  AUTH_SET_LOGGED_OUT
} from '../actions/index'

const auth = (state = {}, action) => {
  switch (action.type) {
    case AUTH_SET_LOGGED_IN:
    case AUTH_SET_LOGGED_OUT:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default auth
