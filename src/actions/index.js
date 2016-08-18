/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { browserHistory } from 'react-router'
import API from '../utils/api'
import { convertToBase64Async, formatProfileData, formatProjectData } from '../utils/helpers'
import { setStorage, getStorage, clearStorage } from '../utils/storage'

// simulate server loading for dev environment only
const devOnlySimulateDelay = process.env.NODE_ENV !== 'production' ? 0 : 0

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
export const EDIT_PROFILE_RESET = 'EDIT_PROFILE_RESET'
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
export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST'
export const DELETE_PROJECT_RESULT = 'DELETE_PROJECT_RESULT'
export const DELETE_PROJECT_FAIL = 'DELETE_PROJECT_FAIL'
// edit/new project
export const EDIT_PROJECT = 'EDIT_PROJECT'
export const EDIT_PROJECT_SUCCESS = 'EDIT_PROJECT_SUCCESS'
export const EDIT_PROJECT_FAIL = 'EDIT_PROJECT_FAIL'
export const EDIT_PROJECT_RESET = 'EDIT_PROJECT_RESET'
export const EDIT_PROJECT_SET = 'EDIT_PROJECT_SET'
export const EDIT_PROJECT_UPLOADING_FILES = 'EDIT_PROJECT_UPLOADING_FILES'
export const EDIT_PROJECT_UPLOADING_FILES_COMPLETE = 'EDIT_PROJECT_UPLOADING_FILES_COMPLETE'
export const EDIT_PROJECT_UPLOADING_FILES_ERROR = 'EDIT_PROJECT_UPLOADING_FILES_ERROR'
export const EDIT_PROJECT_UPDATE_MEDIA = 'EDIT_PROJECT_UPDATE_MEDIA'
export const EDIT_PROJECT_ON_SPLICE_FIELD_ARRAY = 'EDIT_PROJECT_ON_SPLICE_FIELD_ARRAY'
export const EDIT_PROJECT_ON_PUSH_FIELD_ARRAY = 'EDIT_PROJECT_ON_PUSH_FIELD_ARRAY'
export const EDIT_PROJECT_ADD_LINK = 'EDIT_PROJECT_ADD_LINK'
export const EDIT_PROJECT_REMOVE_LINK = 'EDIT_PROJECT_REMOVE_LINK'
export const EDIT_PROJECT_UPDATE_FIELD = 'EDIT_PROJECT_UPDATE_FIELD'
export const EDIT_PROJECT_REMOVE_MEDIA = 'EDIT_PROJECT_REMOVE_MEDIA'
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
const deleteProjectRequest = () => ({
  type: DELETE_PROJECT_REQUEST
})
const deleteProjectResult = () => ({
  type: DELETE_PROJECT_RESULT
})
const deleteProjectFail = (err) => ({
  type: DELETE_PROJECT_FAIL,
  payload: err
})

// EDIT/NEW PROJECT
const editProject = () => ({
  type: EDIT_PROJECT
})
const editProjectUploadingFiles = () => ({
  type: EDIT_PROJECT_UPLOADING_FILES
})
const editProjectUploadingFilesComplete = (data) => ({
  type: EDIT_PROJECT_UPLOADING_FILES_COMPLETE,
  payload: data
})
const editProjectUploadingFilesError = (err) => ({
  type: EDIT_PROJECT_UPLOADING_FILES_ERROR,
  payload: err
})
const editProjectUpdateMedia = (filenames) => ({
  type: EDIT_PROJECT_UPDATE_MEDIA,
  filenames
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

// ADMIN
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

/**
 * Update Profile Field
 * @param {string} fieldName
 * @param {string} fieldValue
 */
export const updateProfileField = (fieldName, fieldValue) => ({
  type: UPDATE_PROFILE_FIELD,
  fieldName,
  fieldValue
})
/**
 * Update Avatar Field
 * @param {string} use
 * @param {string} gravitarEmail
 * @param {string} customAvatarFile
 */
export const updateAvatarFields = (use, gravitarEmail, customAvatarFile) => ({
  type: UPDATE_AVATAR_FIELDS,
  use,
  gravitarEmail,
  customAvatarFile
})
/**
 * Update Layout Field
 * @param {string} fieldName
 * @param {string} fieldValue
 */
export const updateLayoutField = (fieldName, fieldValue) => ({
  type: UPDATE_LAYOUT_FIELD,
  fieldName,
  fieldValue
})
/**
 * add Profile Techicon
 * @param {string} linkGroup
 * @param {string} linkName
 * @param {string} linkIcon
 */
export const addProfileTechicon = (linkGroup, linkName, linkIcon) => ({
  type: ADD_PROFILE_TECHICON,
  linkGroup,
  linkName,
  linkIcon
})
/**
 * add Profile Link
 * @param {string} linkGroup
 * @param {string} linkName
 * @param {string} linkUrl
 */
export const addProfileLink = (linkGroup, linkName, linkUrl) => ({
  type: ADD_PROFILE_LINK,
  linkGroup,
  linkName,
  linkUrl
})
/**
 * remove Profile Item
 * @param {string} linkGroup
 * @param {number} index
 */
export const removeProfileItem = (linkGroup, index) => ({
  type: REMOVE_PROFILE_ITEM,
  linkGroup,
  index
})
/**
 * edit Profile Reset
 */
export const editProfileReset = () => ({
  type: EDIT_PROFILE_RESET
})
/**
 * fetch Profile Async
 * @return {object}
 */
export const fetchProfileAsync = () => {
  return dispatch => {
    dispatch(fetchProfileRequest())
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
    }, devOnlySimulateDelay)
  }
}

// PROJECTS

/**
 * fetch Projects Async
 * @return {object}
 */
export const fetchProjectsAsync = () => {
  return dispatch => {
    dispatch(fetchProjectsRequest())
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
    }, devOnlySimulateDelay)
  }
}

/**
 * Delete project async
 * @param {string} id
 * @param {string} token
 * @return {object}
 */
export const deleteProjectAsync = (id, token) => {
  return dispatch => {
    dispatch(deleteProjectRequest())
    setTimeout(() => {
      API.DeleteProject(id, token)
          .then(response => {
            if(!response.success) {
              dispatch(deleteProjectFail(response.message))
            } else {
              // success!
              dispatch(deleteProjectResult())
              // ensure sync state to db
              dispatch(fetchProjectsAsync())
            }
          })
          .catch((reason) => dispatch(deleteProjectFail(reason.message + '. API server unreachable.')))
    }, devOnlySimulateDelay)
  }
}

// EDIT/NEW PROJECT

/**
 * edit Project Set
 * @param {object} project
 */
export const editProjectSet = (project) => ({
  type: EDIT_PROJECT_SET,
  project
})
/**
 * edit Project Reset
 */
export const editProjectReset = () => ({
  type: EDIT_PROJECT_RESET
})
/**
 * edit Project Update Field
 * @param {string} fieldName
 * @param {string} fieldValue
 */
export const editProjectUpdateField = (fieldName, fieldValue) => ({
  type: EDIT_PROJECT_UPDATE_FIELD,
  fieldName,
  fieldValue
})
/**
 * edit Project On Push Field Array
 * @param {string} fieldName
 * @param {string} fieldValue
 */
export const editProjectOnPushFieldArray = (fieldName, fieldValue) => ({
  type: EDIT_PROJECT_ON_PUSH_FIELD_ARRAY,
  fieldName,
  fieldValue
})
/**
 * edit Project On Splice Field Array
 * @param {string} fieldName
 * @param {number} index
 */
export const editProjectOnSpliceFieldArray = (fieldName, index) => ({
  type: EDIT_PROJECT_ON_SPLICE_FIELD_ARRAY,
  fieldName,
  index
})
/**
 * edit Project Add Link
 * @param {string} linkGroup
 * @param {string} linkName
 * @param {string} linkUrl
 */
export const editProjectAddLink = (linkGroup, linkName, linkUrl) => ({
  type: EDIT_PROJECT_ADD_LINK,
  linkGroup,
  linkName,
  linkUrl
})
/**
 * edit Project Remove Link
 * @param {string} linkGroup
 * @param {number} index
 */
export const editProjectRemoveLink = (linkGroup, index) => ({
  type: EDIT_PROJECT_REMOVE_LINK,
  linkGroup,
  index
})
/**
 * edit Project Remove Media
 * @param {number} index
 */
export const editProjectRemoveMedia = (index) => ({
  type: EDIT_PROJECT_REMOVE_MEDIA,
  index
})
/**
 * edit Project Upload Files Async
 * @param {array} files
 * @param {string} token
 */
export const editProjectUploadFilesAsync = (files, token) => {
  return dispatch => {
    dispatch(editProjectUploadingFiles())
    setTimeout(() => {
      API.UploadProjectFiles(files, token)
          .then(response => {
            if(!response.success) {
              dispatch(editProjectUploadingFilesError(response.message))
            } else {
              // success!
              dispatch(editProjectUploadingFilesComplete())
              dispatch(editProjectUpdateMedia(response.data))
            }
          })
          .catch((reason) => dispatch(editProjectUploadingFilesError(reason.message + '. API server unreachable.')))
    }, devOnlySimulateDelay)
  }
}
/**
 * new Project Async
 * @param {object} formData
 * @param {string} token
 */
export const newProjectAsync = (formData, token) => {
  return (dispatch) => {
    dispatch(editProject())
    setTimeout(() => {
      API.NewProject(formatProjectData(formData), token)
      .then((response) => {
        if(!response.success) {
          // duplicate name/slug error?
          let message = response.message
          if(message.indexOf('duplicate key error') !== -1) {
            message = 'Database duplicate key error. Ensure project name is unique'
          }
          dispatch(editProjectFail(message))
        } else {
          dispatch(editProjectSuccess())
        }
      })
      .catch((reason) => dispatch(editProjectFail(reason.message + '. API server unreachable.')))
    }, devOnlySimulateDelay)
  }
}
/**
 * edit Project Async
 * @param {object} formData
 * @param {string} token
 * @param {string} projectId
 */
export const editProjectAsync = (formData, token, projectId) => {
  return (dispatch) => {
    dispatch(editProject())
    setTimeout(() => {
      API.EditProject(formatProjectData(formData), token, projectId)
      .then((response) => {
        if(!response.success) {
          dispatch(editProjectFail(response.message))
        } else {
          dispatch(editProjectSuccess())
        }
      })
      .catch((reason) => dispatch(editProjectFail(reason.message + '. API server unreachable.')))
    }, devOnlySimulateDelay)
  }
}

// AUTH

/**
 * auth Init
 */
export const authInit = () => (dispatch) => {
  // if storage found and token not expired
  const storageResult = getStorage()
  if(!storageResult) {
    clearStorage()
    dispatch(authFail(''))
  } else {
    dispatch(auth(storageResult.username))
    dispatch(authSuccess({ token: storageResult.token, lastLoggedIn: storageResult.lastLoggedIn }))
  }
}
/**
 * login Async
 * @param {object} formData
 */
export const loginAsync = (formData) => {
  return (dispatch) => {
    dispatch(auth(formData.username))
    setTimeout(() => {
      API.Login(formData)
      .then((response) => {
        if(!response.success) {
          clearStorage()
          dispatch(authFail(response.message))
        } else {
          dispatch(authSuccess(response))
          setStorage(response.token, response.lastLoggedIn, formData.username)
          browserHistory.push('/admin')
        }
      })
      .catch((reason) => {
        clearStorage()
        dispatch(authFail(reason.message + '. API server unreachable.'))
      })
    }, devOnlySimulateDelay)
  }
}
/**
 * logout Async
 * @param {string} token
 */
export const logoutAsync = (token) => (dispatch) => {
  dispatch(authLogout())
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
  }, devOnlySimulateDelay)
}
/**
 * register Async
 * @param {object} formData
 */
export const registerAsync = (formData) => {
  return (dispatch) => {
    dispatch(register())
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
    }, devOnlySimulateDelay)
  }
}
/**
 * forgot Async
 * @param {object} formData
 */
export const forgotAsync = (formData) => {
  return (dispatch) => {
    dispatch(forgot())
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
    }, devOnlySimulateDelay)
  }
}
/**
 * reset Async
 * @param {object} formData
 * @param {string} resetToken
 */
export const resetAsync = (formData, resetToken) => {
  return (dispatch) => {
    dispatch(resetInit())
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
    }, devOnlySimulateDelay)
  }
}

// ADMIN

/**
 * edit Admin Async
 * @param {object} formData
 * @param {string} token
 */
export const editAdminAsync = (formData, token) => {
  return (dispatch) => {
    dispatch(editAdmin())
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
    }, devOnlySimulateDelay)
  }
}
/**
 * edit Profile Async
 * @param {object} formData
 * @param {string} token
 */
export const editProfileAsync = (formData, token) => {
  return (dispatch) => {
    dispatch(editProfile())
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
    }, devOnlySimulateDelay)
  }
}
