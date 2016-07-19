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
 * @extends Component
 */
class AdminNav extends Component {

  render () {
    const { auth, showBackBtn, onClick } = this.props
    return (
      <div styleName="admin-nav" className="row">
        <div className="col s12 l8">
          <p styleName="logout-messages">{auth.logoutError && auth.logoutErrMessage}</p>
        </div>
        <div className="col s6 l2">
          <p><Link styleName="admin-nav-back-btn" className={showBackBtn ? 'btn' : 'btn hide'} to="/admin"><i className="material-icons left">arrow_back</i>Dashboard</Link></p>
        </div>
        <div className="col s6 l2">
          <button onClick={onClick} styleName="logout-btn" className={auth.logoutLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} disabled={auth.logoutLoading}><i className="material-icons">settings</i><span>Logout</span></button>
        </div>
      </div>
    )
  }

}

AdminNav.propTypes = {
  auth: PropTypes.object.isRequired,
  showBackBtn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default CssModules(AdminNav, styles)
