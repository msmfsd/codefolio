/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import profile from './profile'
import projects from './projects'
import auth from './auth'

const reducers = combineReducers({
  profile,
  projects,
  auth,
  routing: routerReducer,
  form: formReducer
})

export default reducers
