/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import { reduxForm } from 'redux-form'
import CssModules from 'react-css-modules'
import { createValidator, email, required } from '../../../utils/validate'
import styles from './ForgotForm.css'

// client validation
const loginValidation = createValidator({
  username: [required, email]
})

/**
 * @class ForgotForm
 * @extends Component
 */
class ForgotForm extends Component {

  componentWillMount () {
    // if loggged in redirect to admin
    if(this.props.auth.token !== null) {
      browserHistory.push('admin')
    }
  }

  render () {
    const { auth, forgotAsync, fields: { username }, handleSubmit } = this.props
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
                <div styleName="forgot-success" className={auth.forgotSuccess ? 'show' : 'hide'}>
                  <h3>Reset link sent</h3>
                  <p>A link to reset your password has been sent to your email address.</p>
                  <p>Return to <Link to="/login">login</Link> page.</p>
                </div>
                <form styleName="forgot-form" className={auth.forgotSuccess ? 'hide' : 'show'} onSubmit={handleSubmit(data => forgotAsync(data))}>
                  <div className="col s12">
                    <h3>Reset admin password</h3>
                    <p>Enter your email address and we will send you a link to reset your password.</p>
                  </div>
                  <div className="input-field col s12">
                    <input type="text" placeholder="Enter your email address" {...username}/>
                    {username.touched && username.error && <div>{username.error}</div>}
                  </div>
                  <div styleName="form-messages" className="col s12">{auth.forgotError && auth.forgotErrMessage}</div>
                  <div className="input-field col s12">
                    <button styleName="form-btn" className={auth.forgotLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} type="submit" disabled={auth.forgotLoading}><i className="material-icons">settings</i><span>Send reset email</span></button>
                  </div>
                  <div className="input-field col s12" styleName="login-links">
                    <Link to="/login">return to login page</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ForgotForm.propTypes = {
  auth: PropTypes.object.isRequired,
  forgotAsync: PropTypes.func,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'forgot',
  fields: [ 'username' ],
  validate: loginValidation
})(CssModules(ForgotForm, styles))
