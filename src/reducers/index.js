/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import profile from './profile'
import projects from './projects'
import auth from './auth'

const reducers = combineReducers({
  profile, projects, auth, routing: routerReducer
})

export default reducers
