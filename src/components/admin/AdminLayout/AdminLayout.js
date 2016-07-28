/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import * as actionCreators from '../../../actions'
import AdminNav from '../AdminNav/AdminNav'
import styles from './AdminLayout.css'

/**
 * @class AdminLayout
 * @extends Component
 */
class AdminLayout extends Component {

  render () {
    const { auth, location, logoutAsync } = this.props
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
                <div styleName="cf-content-admin">
                  <AdminNav onClick={() => logoutAsync(auth.token)} auth={auth} location={location} />
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdminLayout.propTypes = {
  children: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logoutAsync: PropTypes.func.isRequired
}

const mapStateToProps = ({auth}) => ({auth})

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispachToProps)(CssModules(AdminLayout, styles))
