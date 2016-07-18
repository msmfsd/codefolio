/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './Logout.css'

/**
 * @class Logout
 * @extends Component
 */
class Logout extends Component {

  render () {
    const { auth } = this.props
    let text = auth.logoutLoading ? 'Logging out..' : 'Logout ' + auth.username
    let errors = (!auth.logoutError || auth.logoutLoading) ? null : 'Error: ' + auth.logoutErrMessage
    return (
      <div>
        <button disabled={auth.logoutLoading} onClick={this.props.onClick} className="waves-effect btn">{text}</button>
        {errors}
      </div>
    )
  }

}

Logout.propTypes = {
  auth: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default CssModules(Logout, styles)
