/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import styles from './AdminLayout.css'

/**
 * @class AdminLayout
 * @extends Component
 */
class AdminLayout extends Component {

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
              <div className="col s12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdminLayout.propTypes = {
  children: PropTypes.object.isRequired
}

export default CssModules(AdminLayout, styles)
