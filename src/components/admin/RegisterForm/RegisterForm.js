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
import { createValidator, email, required, minLength, maxLength, alphaNumeric, match } from '../../../utils/validate'
import styles from './RegisterForm.css'

// client validation
// TODO match password to passwordMatch
const loginValidation = createValidator({
  username: [required, email],
  password: [required, minLength(6), maxLength(14), alphaNumeric],
  confirm: [required, minLength(6), maxLength(14), alphaNumeric, match('password')]
})

/**
 * @class RegisterForm
 * @extends Component
 */
class RegisterForm extends Component {

  componentWillMount () {
    // if loggged in redirect to admin
    if(this.props.auth.token !== null) {
      browserHistory.push('admin')
    }
  }

  render () {
    const { auth, registerAsync, fields: { username, password, confirm }, handleSubmit } = this.props
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
                <div styleName="register-success" className={auth.registerSuccess ? 'show' : 'hide'}>
                  <h3>Admin created successfully!</h3>
                  <p><Link to="/login">Login</Link> and start building your code folio.</p>
                </div>
                <form styleName="register-form" className={auth.registerSuccess ? 'hide' : 'show'} onSubmit={handleSubmit(data => registerAsync(data))}>
                  <div className="col s12">
                    <h3>Register admin</h3>
                    <p>Your Codefolio allows one administrator account. Ensure you enter your desired login email address correctly.</p>
                  </div>
                  <div className="input-field col s12">
                    <input type="text" placeholder="Enter your email address" {...username}/>
                    {username.touched && username.error && <div>{username.error}</div>}
                  </div>
                  <div className="input-field col s12">
                    <input type="password" placeholder="Password must be alphanumeric" {...password}/>
                    {password.touched && password.error && <div>{password.error}</div>}
                  </div>
                  <div className="input-field col s12">
                    <input type="password" placeholder="Re-enter your password" {...confirm}/>
                    {confirm.touched && confirm.error && <div>{confirm.error}</div>}
                  </div>
                  <div styleName="form-messages" className="col s12">{auth.registerError && auth.registerErrMessage}</div>
                  <div className="input-field col s12">
                    <button styleName="form-btn" className={auth.registerLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} type="submit" disabled={auth.registerLoading}><i className="material-icons">settings</i><span>Register</span></button>
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

RegisterForm.propTypes = {
  auth: PropTypes.object.isRequired,
  registerAsync: PropTypes.func,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'register',
  fields: [ 'username', 'password', 'confirm' ],
  validate: loginValidation
})(CssModules(RegisterForm, styles))
