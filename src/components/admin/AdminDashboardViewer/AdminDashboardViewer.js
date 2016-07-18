/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import Logout from '../Logout/Logout'
import styles from './AdminDashboardViewer.css'

/**
 * @class AdminDashboardViewer
 * @extends Component
 */
class AdminDashboardViewer extends Component {

  render () {
    const { auth, logoutAsync } = this.props
    return (
      <div>
        <Logout onClick={() => logoutAsync(auth.token)} auth={auth} />
        <h1>AdminDashboardViewer component</h1>
        <nav>
          <span><Link className="btn" to={'/admin/edit-administrator'}>Edit Administrator</Link></span>&nbsp;|&nbsp;
          <span><Link className="btn" to={'/admin/edit-profile'}>Edit profile</Link></span>&nbsp;|&nbsp;
          <span><Link className="btn" to={'/admin/edit-projects'}>Edit projects</Link></span>
        </nav>
      </div>
    )
  }
}

AdminDashboardViewer.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutAsync: PropTypes.func.isRequired
}

export default CssModules(AdminDashboardViewer, styles)
