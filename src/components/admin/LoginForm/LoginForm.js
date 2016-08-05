/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import CssModules from 'react-css-modules'
import Panel from '../../Panel/Panel'
import { createValidator, email, required, minLength, maxLength } from '../../../utils/validate'
import styles from './LoginForm.css'

// client validation
const loginValidation = createValidator({
  username: [required, email],
  password: [required, minLength(6), maxLength(14)]
})

/**
 * @class LoginForm
 * @extends Component
 */
class LoginForm extends Component {

  render () {
    const { auth, loginAsync, fields: { username, password }, handleSubmit, defaultInputClasses } = this.props
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
                <div styleName="small-screen-message"><Panel message={'Admin layout works best on screens wider than 360px'} /></div>
                <form styleName="login-form" onSubmit={handleSubmit(data => loginAsync(data))}>
                  <div className="col s12"><h3>Log in to admin</h3></div>
                  <div className={defaultInputClasses}>
                    <input type="text" placeholder="Enter admin email" {...username}/>
                    {username.touched && username.error && <div className="input-field-message">{username.error}</div>}
                  </div>
                  <div className={defaultInputClasses}>
                    <input type="password" placeholder="Enter admin password" {...password}/>
                    {password.touched && password.error && <div className="input-field-message">{password.error}</div>}
                  </div>
                  <div styleName="form-messages" className="col s12">{auth.error && auth.errMessage}</div>
                  <div className={defaultInputClasses}>
                    <button styleName="form-btn" className={auth.authLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} type="submit" disabled={auth.authLoading}><i className="material-icons">settings</i><span>Login</span></button>
                  </div>
                  <div className={defaultInputClasses} styleName="login-links">
                    <Link to="/forgot">forgot password?</Link>
                    <Link to="/register">register admin</Link>
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

LoginForm.propTypes = {
  auth: PropTypes.object.isRequired,
  loginAsync: PropTypes.func,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  defaultInputClasses: PropTypes.string
}

LoginForm.defaultProps = {
  defaultInputClasses: 'input-field col s12'
}

export default reduxForm({
  form: 'login',
  fields: [ 'username', 'password' ],
  validate: loginValidation
})(CssModules(LoginForm, styles))
