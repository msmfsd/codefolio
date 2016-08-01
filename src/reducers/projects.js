/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_RESULT,
  FETCH_PROJECTS_ERROR,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_RESULT,
  DELETE_PROJECT_FAIL
} from '../actions/index'

const projects = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        errMessage: null
      })
    case FETCH_PROJECTS_RESULT:
      return Object.assign({}, state, {
        loading: false,
        hasLoaded: true,
        error: null,
        errMessage: null,
        data: action.payload
      })
    case FETCH_PROJECTS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        hasLoaded: false,
        error: true,
        errMessage: action.payload
      })
    case DELETE_PROJECT_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        errMessage: null
      })
    case DELETE_PROJECT_RESULT:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        errMessage: null
      })
    case DELETE_PROJECT_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: true,
        errMessage: action.payload
      })
    default:
      return state
  }
}

export default projects
