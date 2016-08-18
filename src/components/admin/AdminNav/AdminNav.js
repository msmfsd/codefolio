/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import styles from './AdminNav.css'

/**
 * @class AdminNav
 * @extends {Component}
 */
class AdminNav extends Component {

  render () {
    const { auth, onClick, location } = this.props
    return (
      <div styleName="admin-nav">
        <div className="row">
          <div className="col s12">
            <div styleName="admin-nav-box">
              <Link styleName="admin-nav-back-btn" className={location.pathname !== '/admin' ? 'btn' : 'btn hide'} to="/admin"><i className="material-icons left">arrow_back</i>Dashboard</Link>
              <p styleName="logout-messages">{auth.logoutError && auth.logoutErrMessage}</p>
              <button onClick={onClick} styleName="logout-btn" className={auth.logoutLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} disabled={auth.logoutLoading}><i className="material-icons">settings</i><span>Logout</span></button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

AdminNav.propTypes = {
  auth: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

AdminNav = CssModules(AdminNav, styles)
export default AdminNav
