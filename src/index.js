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
import App from './components/App/App'
import NotFound from './components/NotFound/NotFound'
import Profile from './containers/Profile'
import Project from './containers/Project'
import './assets/css/Global.css'

const initialState = {
  profile: { loading: false, hasLoaded: false, error: false, errMesage: '', data: {} },
  projects: { loading: false, hasLoaded: false, error: false, errMesage: '', data: [] }
}
const store = configureStore(initialState)
const history = syncHistoryWithStore(browserHistory, store)
/*eslint-disable no-console */
console.log('%c CODEFOLIO ', 'background: #171A1F; color: #EE6E73')
/*eslint-enable no-console */

render(<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Profile} />
        <Route path="profile" component={Profile} />
        <Route path="projects/:projectId" component={Project}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>, document.getElementById('root'))
