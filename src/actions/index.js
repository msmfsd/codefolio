/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { browserHistory } from 'react-router'
import API from '../utils/api'
import { convertToBase64Async, formatProfileData, formatProjectData } from '../utils/helpers'
import { setStorage, getStorage, clearStorage } from '../utils/storage'

/*
 * action types
 */

// profile
export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST'
export const FETCH_PROFILE_RESULT = 'FETCH_PROFILE_RESULT'
export const FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR'
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS'
export const EDIT_PROFILE_FAIL = 'EDIT_PROFILE_FAIL'
export const UPDATE_PROFILE_FIELD = 'UPDATE_PROFILE_FIELD'
export const UPDATE_AVATAR_FIELDS = 'UPDATE_AVATAR_FIELDS'
export const UPDATE_LAYOUT_FIELD = 'UPDATE_LAYOUT_FIELD'
export const ADD_PROFILE_TECHICON = 'ADD_PROFILE_TECHICON'
export const ADD_PROFILE_LINK = 'ADD_PROFILE_LINK'
export const REMOVE_PROFILE_ITEM = 'REMOVE_PROFILE_ITEM'
// projects
export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST'
export const FETCH_PROJECTS_RESULT = 'FETCH_PROJECTS_RESULT'
export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR'
export const NEW_PROJECT = 'NEW_PROJECT'
export const NEW_PROJECT_RESET = 'NEW_PROJECT_RESET'
export const NEW_PROJECT_SUCCESS = 'NEW_PROJECT_SUCCESS'
export const NEW_PROJECT_FAIL = 'NEW_PROJECT_FAIL'
export const EDIT_PROJECT = 'EDIT_PROJECT'
export const EDIT_PROJECT_SUCCESS = 'EDIT_PROJECT_SUCCESS'
export const EDIT_PROJECT_FAIL = 'EDIT_PROJECT_FAIL'

// auth
export const AUTH = 'AUTH'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_LOGOUT_FAIL = 'AUTH_LOGOUT_FAIL'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_INIT = 'AUTH_INIT'
export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const FORGOT = 'FORGOT'
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS'
export const FORGOT_FAIL = 'FORGOT_FAIL'
export const RESET_INIT = 'RESET_INIT'
export const RESET_SUCCESS = 'RESET_SUCCESS'
export const RESET_FAIL = 'RESET_FAIL'
// admin
export const EDIT_ADMIN = 'EDIT_ADMIN'
export const EDIT_ADMIN_SUCCESS = 'EDIT_ADMIN_SUCCESS'
export const EDIT_ADMIN_FAIL = 'EDIT_ADMIN_FAIL'

/*
 * private action creators
 */

// PROFILE
const fetchProfileRequest = () => ({
  type: FETCH_PROFILE_REQUEST
})
const fetchProfileResult = (data) => ({
  type: FETCH_PROFILE_RESULT,
  payload: data
})
const fetchProfileError = (err) => ({
  type: FETCH_PROFILE_ERROR,
  payload: err
})
const editProfile = () => ({
  type: EDIT_PROFILE
})
const editProfileSuccess = () => ({
  type: EDIT_PROFILE_SUCCESS
})
const editProfileFail = (err) => ({
  type: EDIT_PROFILE_FAIL,
  payload: err
})

// PROJECTS
const fetchProjectsRequest = () => ({
  type: FETCH_PROJECTS_REQUEST
})
const fetchProjectsResult = (data) => ({
  type: FETCH_PROJECTS_RESULT,
  payload: data
})
const fetchProjectsError = (err) => ({
  type: FETCH_PROJECTS_ERROR,
  payload: err
})
const newProject = () => ({
  type: NEW_PROJECT
})
const newProjectSuccess = () => ({
  type: NEW_PROJECT_SUCCESS
})
const newProjectFail = (err) => ({
  type: NEW_PROJECT_FAIL,
  payload: err
})
const editProject = () => ({
  type: EDIT_PROJECT
})
const editProjectSuccess = () => ({
  type: EDIT_PROJECT_SUCCESS
})
const editProjectFail = (err) => ({
  type: EDIT_PROJECT_FAIL,
  payload: err
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
const authFail = (err) => ({
  type: AUTH_FAIL,
  payload: err
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
const register = () => ({
  type: REGISTER
})
const registerSuccess = () => ({
  type: REGISTER_SUCCESS
})
const registerFail = (err) => ({
  type: REGISTER_FAIL,
  payload: err
})
const forgot = () => ({
  type: FORGOT
})
const forgotSuccess = (data) => ({
  type: FORGOT_SUCCESS,
  payload: data
})
const forgotFail = (err) => ({
  type: FORGOT_FAIL,
  payload: err
})
const resetInit = () => ({
  type: RESET_INIT
})
const resetSuccess = (data) => ({
  type: RESET_SUCCESS,
  payload: data
})
const resetFail = (err) => ({
  type: RESET_FAIL,
  payload: err
})

// admin
const editAdmin = () => ({
  type: EDIT_ADMIN
})
const editAdminSuccess = () => ({
  type: EDIT_ADMIN_SUCCESS
})
const editAdminFail = (err) => ({
  type: EDIT_ADMIN_FAIL,
  payload: err
})

/*
 * public action methods
 */

// PROFILE
export const updateProfileField = (fieldName, fieldValue) => ({
  type: UPDATE_PROFILE_FIELD,
  fieldName,
  fieldValue
})

export const updateAvatarFields = (use, gravitarEmail, customAvatarFile) => ({
  type: UPDATE_AVATAR_FIELDS,
  use,
  gravitarEmail,
  customAvatarFile
})

export const updateLayoutField = (fieldName, fieldValue) => ({
  type: UPDATE_LAYOUT_FIELD,
  fieldName,
  fieldValue
})

export const addProfileTechicon = (linkGroup, linkName, linkIcon) => ({
  type: ADD_PROFILE_TECHICON,
  linkGroup,
  linkName,
  linkIcon
})

export const addProfileLink = (linkGroup, linkName, linkUrl) => ({
  type: ADD_PROFILE_LINK,
  linkGroup,
  linkName,
  linkUrl
})

export const removeProfileItem = (linkGroup, index) => ({
  type: REMOVE_PROFILE_ITEM,
  linkGroup,
  index
})

export const fetchProfileAsync = () => {
  return dispatch => {
    dispatch(fetchProfileRequest())
    // TODO dev only
    setTimeout(() => {
      API.FetchCodefolioProfile()
          .then(response => {
            if(!response.success) {
              dispatch(fetchProfileError(response.message))
            } else {
              // success!
              dispatch(fetchProfileResult(response.data))
            }
          })
          .catch((reason) => dispatch(fetchProfileError(reason.message + '. API server unreachable.')))
    }, 500)
  }
}

// PROJECTS

export const newProjectReset = () => ({
  type: NEW_PROJECT_RESET
})

export const fetchProjectsAsync = () => {
  return dispatch => {
    dispatch(fetchProjectsRequest())
    // TODO dev only
    setTimeout(() => {
      API.FetchCodefolioProjects()
          .then(response => {
            if(!response.success) {
              dispatch(fetchProjectsError(response.message))
            } else {
              // success!
              dispatch(fetchProjectsResult(response.data))
            }
          })
          .catch((reason) => dispatch(fetchProjectsError(reason.message + '. API server unreachable.')))
    }, 500)
  }
}

export const newProjectAsync = (formData, token) => {
  return (dispatch) => {
    dispatch(newProject())
    // TODO dev only
    setTimeout(() => {
      API.NewProject(formatProjectData(formData), token)
      .then((response) => {
        if(!response.success) {
          // duplicate name/slug error?
          let message = response.message
          if(message.indexOf('duplicate key error') !== -1) {
            message = 'Database duplicate key error. Ensure project name is unique'
          }
          dispatch(newProjectFail(message))
        } else {
          dispatch(newProjectSuccess())
        }
      })
      .catch((reason) => dispatch(newProjectFail(reason.message + '. API server unreachable.')))
    }, 500)
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
    dispatch(authSuccess({ token: storageResult.token, lastLoggedIn: storageResult.lastLoggedIn }))
  }
}

export const loginAsync = (formData) => {
  return (dispatch) => {
    dispatch(auth(formData.username))
    // TODO dev only
    setTimeout(() => {
      API.Login(formData)
      .then((response) => {
        if(!response.success) {
          dispatch(authFail(response.message))
        } else {
          dispatch(authSuccess(response))
          setStorage(response.token, response.lastLoggedIn, formData.username)
          browserHistory.push('/admin')
        }
      })
      .catch((reason) => dispatch(authFail(reason.message + '. API server unreachable.')))
    }, 500)
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
    .catch((reason) => dispatch(authLogoutFail(reason.message + '. API server unreachable.')))
  }, 500)
}

export const registerAsync = (formData) => {
  return (dispatch) => {
    dispatch(register())
    // TODO dev only
    setTimeout(() => {
      API.Register(formData)
      .then((response) => {
        if(!response.success) {
          dispatch(registerFail(response.message))
        } else {
          dispatch(registerSuccess())
        }
      })
      .catch((reason) => dispatch(registerFail(reason.message + '. API server unreachable.')))
    }, 500)
  }
}

export const forgotAsync = (formData) => {
  return (dispatch) => {
    dispatch(forgot())
    // TODO dev only
    setTimeout(() => {
      API.Forgot(formData)
      .then((response) => {
        if(!response.success) {
          dispatch(forgotFail(response.message))
        } else {
          dispatch(forgotSuccess(response))
        }
      })
      .catch((reason) => dispatch(forgotFail(reason.message + '. API server unreachable.')))
    }, 500)
  }
}

export const resetAsync = (formData, resetToken) => {
  return (dispatch) => {
    dispatch(resetInit())
    // TODO dev only
    setTimeout(() => {
      API.Reset(formData, resetToken)
      .then((response) => {
        if(!response.success) {
          dispatch(resetFail(response.message))
        } else {
          dispatch(resetSuccess(response))
        }
      })
      .catch((reason) => dispatch(resetFail(reason.message + '. API server unreachable.')))
    }, 500)
  }
}

// admin
export const editAdminAsync = (formData, token) => {
  return (dispatch) => {
    dispatch(editAdmin())
    // TODO dev only
    setTimeout(() => {
      API.EditAdmin(formData, token)
      .then((response) => {
        if(!response.success) {
          dispatch(editAdminFail(response.message))
        } else {
          dispatch(editAdminSuccess())
          // logout app and reset form
          dispatch(authLogoutSuccess())
          clearStorage()
          browserHistory.push('/login')
        }
      })
      .catch((reason) => dispatch(editAdminFail(reason.message + '. API server unreachable.')))
    }, 500)
  }
}

export const editProfileAsync = (formData, token) => {
  return (dispatch) => {
    dispatch(editProfile())
    // TODO dev only
    setTimeout(() => {
      convertToBase64Async(formData)
      .then((base64) => {
        API.EditProfile(formatProfileData(formData, base64), token)
        .then((response) => {
          if(!response.success) {
            dispatch(editProfileFail(response.message))
          } else {
            dispatch(editProfileSuccess())
            // now update profile store
            dispatch(fetchProfileAsync())
          }
        })
        .catch((reason) => dispatch(editProfileFail(reason.message + '. API server unreachable.')))
      }).catch((reason) => dispatch(editProfileFail(reason.message)))
    }, 500)
  }
}
