/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_RESULT,
  FETCH_PROJECTS_ERROR,
  NEW_PROJECT,
  NEW_PROJECT_RESET,
  NEW_PROJECT_SUCCESS,
  NEW_PROJECT_FAIL,
  EDIT_PROJECT,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAIL
} from '../actions/index'

const projects = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        errMesage: null
      })
    case FETCH_PROJECTS_RESULT:
      return Object.assign({}, state, {
        loading: false,
        hasLoaded: true,
        error: null,
        errMesage: null,
        data: action.payload
      })
    case FETCH_PROJECTS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        hasLoaded: false,
        error: true,
        errMesage: action.payload
      })
    case NEW_PROJECT:
      return Object.assign({}, state, {
        newProjectLoading: true,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: null
      })
    case NEW_PROJECT_RESET:
      return Object.assign({}, state, {
        newProjectLoading: false,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: null
      })
    case NEW_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        newProjectLoading: false,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: true
      })
    case NEW_PROJECT_FAIL:
      return Object.assign({}, state, {
        newProjectLoading: false,
        newProjectErrMessage: action.payload,
        newProjectError: true,
        newProjectSuccess: null
      })
    case EDIT_PROJECT:
      return Object.assign({}, state, {
        editProjectLoading: true,
        editProjectSuccess: null,
        editProjectErrMessage: null,
        editProjectError: null
      })
    case EDIT_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        editProjectLoading: false,
        editProjectErrMessage: null,
        editProjectError: null,
        editProjectSuccess: true
      })
    case EDIT_PROJECT_FAIL:
      return Object.assign({}, state, {
        editProjectErrMessage: action.payload,
        editProjectLoading: false,
        editProjectError: true,
        editProjectSuccess: null
      })
    default:
      return state
  }
}

export default projects
