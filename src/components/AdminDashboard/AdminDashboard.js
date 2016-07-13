import React, { Component } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import styles from './AdminDashboard.css'

/**
 * @class AdminDashboard
 * @extends Component
 */
class AdminDashboard extends Component {

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h1>Admin dashboard component</h1>
            <nav>
              <span><Link className="btn" to={'/admin/edit-administrator'}>Edit Administrator</Link></span>&nbsp;|&nbsp;
              <span><Link className="btn" to={'/admin/edit-profile'}>Edit profile</Link></span>&nbsp;|&nbsp;
              <span><Link className="btn" to={'/admin/edit-projects'}>Edit projects</Link></span>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default CssModules(AdminDashboard, styles)
