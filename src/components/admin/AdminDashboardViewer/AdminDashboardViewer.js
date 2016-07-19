/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import AdminNav from '../AdminNav/AdminNav'
import styles from './AdminDashboardViewer.css'

/**
 * @class AdminDashboardViewer
 * @extends Component
 */
class AdminDashboardViewer extends Component {

  render () {
    const { auth, logoutAsync } = this.props
    return (
      <div styleName="cf-content-admin">
        <AdminNav onClick={() => logoutAsync(auth.token)} auth={auth} showBackBtn={false} />
        <div className="row">
          <div className="col s12">
            <h3>Admin Dashboard</h3>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6 l4">
            <div className="card hoverable">
              <div className="card-content">
                <span className="card-title">Manage Admin</span>
                <p>Manage administrator settings to update your admin username and password.</p>
              </div>
              <div className="card-action">
                <Link styleName="admin-btn" className="btn" to={'/admin/edit-administrator'}>Edit</Link>
              </div>
            </div>
          </div>
          <div className="col s12 m6 l4">
            <div className="card hoverable">
              <div className="card-content">
                <span className="card-title">Manage Profile</span>
                <p>Manage your public folio profile to update your avatar, details, technology set, contacts and bio.</p>
              </div>
              <div className="card-action">
                <Link styleName="admin-btn" className="btn" to={'/admin/edit-profile'}>Edit</Link>
              </div>
            </div>
          </div>
          <div className="col s12 m6 l4">
            <div className="card hoverable">
              <div className="card-content">
                <span className="card-title">Manage Projects</span>
                  <p>Manage your public folio projects to add, edit or remove showcases of your development work.</p>
              </div>
              <div className="card-action">
                <Link styleName="admin-btn" className="btn" to={'/admin/edit-projects'}>Edit</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdminDashboardViewer.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutAsync: PropTypes.func.isRequired
}

export default CssModules(AdminDashboardViewer, styles)
