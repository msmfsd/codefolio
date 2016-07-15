/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import {
  AUTH,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL
} from '../actions/index'

const auth = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      return Object.assign({}, state, {
        authLoading: true,
        username: action.payload,
        authFailed: null
      })
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        token: action.payload.token,
        lastLoggedIn: action.payload.lastLoggedIn,
        authLoading: false,
        errMessage: null,
        error: null
      })
    case AUTH_FAIL:
      return Object.assign({}, state, {
        errMessage: action.payload,
        error: true,
        authLoading: false,
        authFailed: true
      })
    case AUTH_LOGOUT:
      return Object.assign({}, state, {
        logoutLoading: true
      })
    case AUTH_LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        token: null,
        username: null,
        lastLoggedIn: null,
        logoutLoading: false,
        logoutErrMessage: null,
        logoutError: null
      })
    case AUTH_LOGOUT_FAIL:
      return Object.assign({}, state, {
        logoutErrMessage: action.payload,
        logoutError: true,
        logoutLoading: false,
        logoutFail: true
      })
    default:
      return state
  }
}

export default auth
