/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import API from '../utils/api'
import { setStorage, getStorage, clearStorage } from '../utils/storage'
import { browserHistory } from 'react-router'

/*
 * action types
 */
export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST'
export const FETCH_PROFILE_RESULT = 'FETCH_PROFILE_RESULT'
export const FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR'
export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST'
export const FETCH_PROJECTS_RESULT = 'FETCH_PROJECTS_RESULT'
export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR'
export const AUTH = 'AUTH'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_LOGOUT_FAIL = 'AUTH_LOGOUT_FAIL'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_INIT = 'AUTH_INIT'

/*
 * private action creators
 */

// PROFILE
const fetchProfileRequest = () => ({
  type: FETCH_PROFILE_REQUEST,
  payload: {
    loading: true
  }
})
const fetchProfileResult = (data) => ({
  type: FETCH_PROFILE_RESULT,
  payload: data
})
const fetchProfileError = (err) => ({
  type: FETCH_PROFILE_ERROR,
  payload: {
    loading: false,
    hasLoaded: false,
    error: true,
    errMesage: err.message
  }
})

// PROJECTS
const fetchProjectsRequest = () => ({
  type: FETCH_PROJECTS_REQUEST,
  payload: {
    loading: true
  }
})
const fetchProjectsResult = (result) => ({
  type: FETCH_PROJECTS_RESULT,
  payload: {
    loading: false,
    hasLoaded: true,
    error: false,
    errMesage: '',
    data: result.data
  }
})
const fetchProjectsError = (err) => ({
  type: FETCH_PROJECTS_ERROR,
  payload: {
    loading: false,
    hasLoaded: false,
    error: true,
    errMesage: err.message
  }
})

// AUTH
const auth = (username) => ({
  type: AUTH,
  payload: username
})

const authSuccess = (data) => ({
  type: AUTH_SUCCESS,
  payload: data
})

const authFail = (data) => ({
  type: AUTH_FAIL,
  payload: data
})

const authLogout = () => ({
  type: AUTH_LOGOUT
})

const authLogoutFail = (err) => ({
  type: AUTH_LOGOUT_FAIL,
  payload: err
})

const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS
})

/*
 * public action methods
 */

// PROFILE
export const fetchProfileAsync = () => {
  return dispatch => {
    dispatch(fetchProfileRequest())
    API.FetchCodefolioProfile()
        .then(response => {
          if(!response.success) {
            dispatch(fetchProfileError(response.message))
          } else {
            // success!
            dispatch(fetchProfileResult({
              loading: false,
              hasLoaded: true,
              error: false,
              errMesage: '',
              data: response.data
            }))
          }
        })
        .catch((reason) => dispatch(fetchProfileError(reason)))
  }
}

// PROJECTS
export const fetchProjectsAsync = () => {
  return dispatch => {
    dispatch(fetchProjectsRequest())
    API.FetchCodefolioProjects()
        .then(response => {
          if(!response.success) {
            dispatch(fetchProjectsError(response.message))
          } else {
            // success!
            dispatch(fetchProjectsResult({
              loading: false,
              hasLoaded: true,
              error: false,
              errMesage: '',
              data: response.data
            }))
          }
        })
        .catch((reason) => dispatch(fetchProjectsError(reason)))
  }
}

// AUTH
export const authInit = () => (dispatch) => {
  // if storage found and token not expired
  const storageResult = getStorage()
  if(!storageResult) {
    clearStorage()
  } else {
    dispatch(auth(storageResult.username))
    dispatch(authSuccess({ token: storageResult.token }))
  }
}

export const loginAsync = ({username, password}) => {
  return (dispatch) => {
    dispatch(auth(username))
    // TODO dev only
    setTimeout(() => {
      API.Login(username, password)
      .then((response) => {
        if(!response.success) {
          dispatch(authFail(response.message))
        } else {
          dispatch(authSuccess(response))
          setStorage(response.token, username)
          browserHistory.push('/admin')
        }
      })
      .catch((reason) => dispatch(authFail(reason.message)))
    }, 1500)
  }
}

export const logoutAsync = (token) => (dispatch) => {
  dispatch(authLogout())
  // TODO dev only
  setTimeout(() => {
    API.Logout(token)
    .then((response) => {
      if(!response.success) {
        dispatch(authLogoutFail(response.message))
      } else {
        dispatch(authLogoutSuccess())
        clearStorage()
        browserHistory.push('/login')
      }
    })
    .catch((reason) => dispatch(authLogoutFail(reason.message)))
  }, 1500)
}
