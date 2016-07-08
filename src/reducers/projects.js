/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_RESULT, FETCH_PROJECTS_ERROR } from '../actions/index'

const projects = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
    case FETCH_PROJECTS_RESULT:
    case FETCH_PROJECTS_ERROR:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default projects
