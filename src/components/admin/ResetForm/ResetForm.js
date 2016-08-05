/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import CssModules from 'react-css-modules'
import { createValidator, required, minLength, maxLength, alphaNumeric, match } from '../../../utils/validate'
import styles from './ResetForm.css'

// client validation
const loginValidation = createValidator({
  password: [required, minLength(6), maxLength(14), alphaNumeric],
  confirm: [required, minLength(6), maxLength(14), alphaNumeric, match('password')]
})

/**
 * @class ResetForm
 * @extends Component
 */
class ResetForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      resetToken: ''
    }
  }

  componentWillMount () {
    // get emailed reset token from router params
    this.setState({
      resetToken: this.props.params.resetToken
    })
  }

  render () {
    const { auth, resetAsync, fields: { password, confirm }, handleSubmit, defaultInputClasses } = this.props
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
                <div styleName="reset-success" className={auth.resetSuccess ? 'show' : 'hide'}>
                  <h3>Admin password updated</h3>
                  <p><Link to="/login">Click here to login</Link> with your new password.</p>
                </div>
                <form styleName="reset-form" className={auth.resetSuccess ? 'hide' : 'show'} onSubmit={handleSubmit(data => resetAsync(data, this.state.resetToken))}>
                  <div className="col s12">
                    <h3>Reset admin password</h3>
                    <p>Enter your new password.</p>
                  </div>
                  <div className={defaultInputClasses}>
                    <input type="password" placeholder="Enter your new password" {...password}/>
                    {password.touched && password.error && <div className="input-field-message">{password.error}</div>}
                  </div>
                  <div className={defaultInputClasses}>
                    <input type="password" placeholder="Confirm your new password" {...confirm}/>
                    {confirm.touched && confirm.error && <div className="input-field-message">{confirm.error}</div>}
                  </div>
                  <div styleName="form-messages" className="col s12">{auth.resetError && auth.resetErrMessage}</div>
                  <div className={defaultInputClasses}>
                    <button styleName="form-btn" className={auth.resetLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} type="submit" disabled={auth.resetLoading}><i className="material-icons">settings</i><span>Reset password</span></button>
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

ResetForm.propTypes = {
  auth: PropTypes.object.isRequired,
  resetAsync: PropTypes.func,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  params: PropTypes.object,
  defaultInputClasses: PropTypes.string
}

ResetForm.defaultProps = {
  defaultInputClasses: 'input-field col s12'
}

export default reduxForm({
  form: 'reset',
  fields: [ 'password', 'confirm' ],
  validate: loginValidation
})(CssModules(ResetForm, styles))
