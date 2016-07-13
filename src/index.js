/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import 'babel-polyfill'
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import configureStore from './store'
import Profile from './containers/Profile'
import Project from './containers/Project'
import Login from './containers/Login'
import Register from './containers/Register'
import Forgot from './containers/Forgot'
import Reset from './containers/Reset'
import EditAdministrator from './containers/EditAdministrator'
import EditProfile from './containers/EditProfile'
import EditProjects from './containers/EditProjects'
import Admin from './components/Admin/Admin'
import App from './components/App/App'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import NotFound from './components/NotFound/NotFound'
import './assets/css/Global.css'

const initialState = {
  profile: { loading: false, hasLoaded: false, error: false, errMesage: '', data: {} },
  projects: { loading: false, hasLoaded: false, error: false, errMesage: '', data: [] },
  auth: { isLoggedIn: false, jwt: '', message: '' }
}
const store = configureStore(initialState)
const history = syncHistoryWithStore(browserHistory, store)
const requireAuth = (nextState, replace) => {
  if (!store.getState().auth.isLoggedIn) {
    replace('/login')
  }
}
/*eslint-disable no-console */
if (process.env.NODE_ENV !== 'production') {
  console.log('%c CODEFOLIO ', 'background: #171A1F; color: #EE6E73')
}
/*eslint-enable no-console */

render(<Provider store={store}>
    <Router history={history}>
      <Route path={'/login'} component={Login}/>
      <Route path={'/register'} component={Register}/>
      <Route path={'/forgot'} component={Forgot}/>
      <Route path={'/reset'} component={Reset}/>
      <Route path={'/admin'} component={Admin} onEnter={requireAuth}>
        <IndexRoute component={AdminDashboard}/>
        <Route path={'edit-administrator'} component={EditAdministrator} />
        <Route path={'edit-profile'} component={EditProfile} />
        <Route path={'edit-projects'} component={EditProjects} />
      </Route>
      <Route path={'/'} component={App}>
        <IndexRoute component={Profile} />
        <Route path={'profile'} component={Profile} />
        <Route path={'projects/:projectId'} component={Project}/>
        <Route path={'*'} component={NotFound}/>
      </Route>
    </Router>
  </Provider>, document.getElementById('root'))
