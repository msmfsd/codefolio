/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import styles from './Admin.css'

/**
 * @class Admin
 * @extends Component
 */
class Admin extends Component {

  render () {
    return (
      <div styleName="cf-container" className="container">
        <div className="row">
          <div className="col s12" styleName="cf-main">
            <div styleName="cf-main-inner"></div>
            <div className="row">
              <div styleName="cf-nav-admin" className="col s12 no-padding">
                <Link styleName="cf-logo" to="/">Codefolio</Link>
              </div>
            </div>
            <div className="row">
              <div className="col s12" styleName="cf-content-admin">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Admin.propTypes = {
  children: PropTypes.object.isRequired
}

export default CssModules(Admin, styles)
