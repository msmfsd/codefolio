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
  AUTH_LOGOUT_FAIL,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FORGOT,
  FORGOT_SUCCESS,
  FORGOT_FAIL,
  RESET_INIT,
  RESET_SUCCESS,
  RESET_FAIL
} from '../actions/index'

const auth = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      return Object.assign({}, state, {
        authLoading: true,
        username: action.payload,
        errMessage: null,
        error: null
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
        authLoading: false
      })
    case AUTH_LOGOUT:
      return Object.assign({}, state, {
        logoutLoading: true,
        logoutErrMessage: null,
        logoutError: null
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
        logoutLoading: false
      })
    case REGISTER:
      return Object.assign({}, state, {
        registerLoading: true,
        registerErrMessage: null,
        registerError: null
      })
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        registerLoading: false,
        registerErrMessage: null,
        registerError: null,
        registerSuccess: true
      })
    case REGISTER_FAIL:
      return Object.assign({}, state, {
        registerErrMessage: action.payload,
        registerError: true,
        registerLoading: false,
        registerSuccess: false
      })
    case FORGOT:
      return Object.assign({}, state, {
        forgotLoading: true,
        forgotErrMessage: null,
        forgotError: null
      })
    case FORGOT_SUCCESS:
      return Object.assign({}, state, {
        forgotLoading: false,
        forgotErrMessage: null,
        forgotError: null,
        forgotSuccess: true
      })
    case FORGOT_FAIL:
      return Object.assign({}, state, {
        forgotErrMessage: action.payload,
        forgotError: true,
        forgotLoading: false,
        forgotSuccess: false
      })
    case RESET_INIT:
      return Object.assign({}, state, {
        resetLoading: true,
        resetErrMessage: null,
        resetError: null
      })
    case RESET_SUCCESS:
      return Object.assign({}, state, {
        resetLoading: false,
        resetErrMessage: null,
        resetError: null,
        resetSuccess: true
      })
    case RESET_FAIL:
      return Object.assign({}, state, {
        resetErrMessage: action.payload,
        resetError: true,
        resetLoading: false,
        resetSuccess: false
      })
    default:
      return state
  }
}

export default auth
