/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/* eslint no-unused-vars: "off" */
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './containers/App/App'
import Profile from './containers/Profile/Profile'
import Projects from './containers/Projects/Projects'
import NotFound from './containers/NotFound/NotFound'
import styles from './assets/css/Global.css'

render(
  (<Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Profile} />
        <Route path="profile" component={Profile} />
        <Route path="projects/:projectId" component={Projects}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  ), document.getElementById('app')
)
