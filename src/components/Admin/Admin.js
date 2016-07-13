import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './Admin.css'

/**
 * @class Admin
 * @extends Component
 */
class Admin extends Component {

  render () {
    return (
      <div styleName="cf-admin-container" className="container">
        <div className="row">
          <div className="col s12" styleName="cf-admin-main">
            {this.props.children}
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
