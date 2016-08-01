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
import editProject from './editProject'
import admin from './admin'
import auth from './auth'

const reducers = combineReducers({
  profile,
  projects,
  editProject,
  admin,
  auth,
  routing: routerReducer,
  form: formReducer
})

export default reducers
