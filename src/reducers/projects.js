/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_RESULT,
  FETCH_PROJECTS_ERROR
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
    default:
      return state
  }
}

export default projects
