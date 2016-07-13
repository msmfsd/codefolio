/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import API from '../utils/api'

/*
 * action types
 */
export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST'
export const FETCH_PROFILE_RESULT = 'FETCH_PROFILE_RESULT'
export const FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR'
export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST'
export const FETCH_PROJECTS_RESULT = 'FETCH_PROJECTS_RESULT'
export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR'
export const AUTH_SET_LOGGED_IN = 'AUTH_SET_LOGGED_IN'
export const AUTH_SET_LOGGED_OUT = 'AUTH_SET_LOGGED_OUT'

/*
 * async action creators
 */

// profile
export function fetchProfileAsync () {
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
        .catch(reason => {
          dispatch(fetchProfileError(reason))
        })
  }
}

// projects
export function fetchProjectsAsync () {
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
        .catch(reason => {
          dispatch(fetchProjectsError(reason))
        })
  }
}

/*
 * action creators
 */

// profile
export function fetchProfileRequest () {
  return {
    type: FETCH_PROFILE_REQUEST,
    payload: {
      loading: true
    }
  }
}
export function fetchProfileResult (data) {
  return {
    type: FETCH_PROFILE_RESULT,
    payload: data
  }
}
export function fetchProfileError (err) {
  return {
    type: FETCH_PROFILE_ERROR,
    payload: {
      loading: false,
      hasLoaded: false,
      error: true,
      errMesage: err.message
    }
  }
}

// projects
export function fetchProjectsRequest () {
  return {
    type: FETCH_PROJECTS_REQUEST,
    payload: {
      loading: true
    }
  }
}
export function fetchProjectsResult (result) {
  return {
    type: FETCH_PROJECTS_RESULT,
    payload: {
      loading: false,
      hasLoaded: true,
      error: false,
      errMesage: '',
      data: result.data
    }
  }
}
export function fetchProjectsError (err) {
  return {
    type: FETCH_PROJECTS_ERROR,
    payload: {
      loading: false,
      hasLoaded: false,
      error: true,
      errMesage: err.message
    }
  }
}

// auth
export function authSetLoggedIn (jwt, message) {
  return {
    type: AUTH_SET_LOGGED_IN,
    payload: {
      isLoggedIn: true,
      jwt: jwt,
      message: message
    }
  }
}
export function authSetLoggedOut (message) {
  return {
    type: AUTH_SET_LOGGED_OUT,
    payload: {
      isLoggedIn: false,
      jwt: '',
      message: message
    }
  }
}
