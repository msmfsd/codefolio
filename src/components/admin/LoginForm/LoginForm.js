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

  componentWillMount () {
    // if loggged in redirect to admin
    if(this.props.auth.token !== null) {
      browserHistory.push('admin')
    }
  }

  render () {
    const { auth, loginAsync, fields: { username, password }, handleSubmit } = this.props
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
                <form styleName="login-form" onSubmit={handleSubmit(data => loginAsync(data))}>
                  <div className="col s12"><h3>Log in to admin</h3></div>
                  <div className="input-field col s12">
                    <input type="text" placeholder="Enter admin email" {...username}/>
                    {username.touched && username.error && <div>{username.error}</div>}
                  </div>
                  <div className="input-field col s12">
                    <input type="password" placeholder="Enter admin password" {...password}/>
                    {password.touched && password.error && <div>{password.error}</div>}
                  </div>
                  <div styleName="form-messages" className="col s12">{auth.error && auth.errMessage}</div>
                  <div className="input-field col s12">
                    <button styleName="form-btn" className={auth.authLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} type="submit" disabled={auth.authLoading}><i className="material-icons">settings</i><span>Login</span></button>
                  </div>
                  <div className="input-field col s12" styleName="login-links">
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
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'login',
  fields: [ 'username', 'password' ],
  validate: loginValidation
})(CssModules(LoginForm, styles))
