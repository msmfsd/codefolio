/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/*eslint-disable*/
if (process.env.NODE_ENV !== 'production') { console.log('%c codefolio ', 'background: #171A1F; color: #EE6E73') }
/*eslint-enable*/
import React from 'react'
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import initialState from './store/initial-state'
import configureStore from './store'
import { authInit } from './actions'
import Profile from './containers/Profile'
import Project from './containers/Project'
import Login from './containers/admin/Login'
import Register from './containers/admin/Register'
import Forgot from './containers/admin/Forgot'
import Reset from './containers/admin/Reset'
import AdminDashboard from './containers/admin/AdminDashboard'
import EditAdministrator from './containers/admin/EditAdministrator'
import EditProfile from './containers/admin/EditProfile'
import EditProject from './containers/admin/EditProject'
import NewProject from './containers/admin/NewProject'
import AdminLayout from './components/admin/AdminLayout/AdminLayout'
import App from './components/App/App'
import NotFound from './components/NotFound/NotFound'
import './assets/css/Global.css'

// configure store/history
const store = configureStore(initialState)
const history = syncHistoryWithStore(browserHistory, store)

// fire auth init action
store.dispatch(authInit())

// redirect admin to login?
const redirectIfLoggedOut = (nextState, replace) => {
  if (!store.getState().auth.token || !store.getState().auth.username) {
    replace('/login')
  }
}
// redirect reset/forgot/login/register to admin?
const redirectIfLoggedIn = (nextState, replace) => {
  if (store.getState().auth.token || store.getState().auth.username) {
    replace('/admin')
  }
}

render(<Provider store={store}>
    <Router history={history} render={applyRouterMiddleware(useScroll())}>
      <Route path={'/login'} component={Login} onEnter={redirectIfLoggedIn}/>
      <Route path={'/register'} component={Register} onEnter={redirectIfLoggedIn}/>
      <Route path={'/forgot'} component={Forgot} onEnter={redirectIfLoggedIn}/>
      <Route path={'/reset/:resetToken'} component={Reset} onEnter={redirectIfLoggedIn}/>
      <Route path={'/admin'} component={AdminLayout} onEnter={redirectIfLoggedOut}>
        <IndexRoute component={AdminDashboard}/>
        <Route path={'edit-administrator'} component={EditAdministrator} />
        <Route path={'edit-profile'} component={EditProfile} />
        <Route path={'edit-project/:projectId'} component={EditProject} />
        <Route path={'new-project'} component={NewProject} />
      </Route>
      <Route path={'/'} component={App}>
        <IndexRoute component={Profile} />
        <Route path={'profile'} component={Profile} />
        <Route path={'projects/:projectId'} component={Project}/>
        <Route path={'*'} component={NotFound}/>
      </Route>
    </Router>
  </Provider>, document.getElementById('root'))
