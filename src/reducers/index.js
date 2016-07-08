/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import profile from './profile'
import projects from './projects'

const reducers = combineReducers({
  profile, projects, routing: routerReducer
})

export default reducers
