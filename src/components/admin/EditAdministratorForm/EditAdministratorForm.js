/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import CssModules from 'react-css-modules'
import AdminNav from '../AdminNav/AdminNav'
import { createValidator, required, minLength, maxLength, alphaNumeric, match } from '../../../utils/validate'
import styles from './EditAdministratorForm.css'

// client validation
const editadminValidation = createValidator({
  password: [required, minLength(6), maxLength(14), alphaNumeric],
  confirm: [required, minLength(6), maxLength(14), alphaNumeric, match('password')]
})

/**
 * @class EditAdministratorForm
 * @extends Component
 */
class EditAdministratorForm extends Component {

  render () {
    const { auth, logoutAsync, admin, editAdminAsync, fields: { password, confirm }, handleSubmit, defaultInputClasses } = this.props
    const lastLoggedIn = String(new Date(auth.lastLoggedIn))
    return (
      <div>
        <AdminNav onClick={() => logoutAsync(auth.token)} auth={auth} showBackBtn={true} />
        <div styleName="form-container">
          <div className="row">
            <div styleName="card-padding" className="card-panel">
              <span><b>Username</b>: {auth.username}<br /><b>Last login</b>: {lastLoggedIn}</span>
            </div>
          </div>
          <div className="row">
            <form onSubmit={handleSubmit(data => editAdminAsync(data, auth.token))}>
              <div className="col s12">
                <h3>Edit admin password</h3>
                <p>Note that you will be automatically logged out when your password is successfully updated.</p>
              </div>
              <div className={defaultInputClasses}>
                <input type="password" placeholder="Password must be alphanumeric" {...password}/>
                {password.touched && password.error && <div className="input-field-message">{password.error}</div>}
              </div>
              <div className={defaultInputClasses}>
                <input type="password" placeholder="Re-enter your password" {...confirm}/>
                {confirm.touched && confirm.error && <div className="input-field-message">{confirm.error}</div>}
              </div>
              <div styleName="form-messages" className="col s12">{admin.editAdminError && admin.editAdminErrMessage}</div>
              <div className={defaultInputClasses}>
                <button styleName="form-btn" className={admin.editAdminLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} type="submit" disabled={admin.editAdminLoading}><i className="material-icons">settings</i><span>Update</span></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

EditAdministratorForm.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutAsync: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  editAdminAsync: PropTypes.func,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  defaultInputClasses: PropTypes.string
}

EditAdministratorForm.defaultProps = {
  defaultInputClasses: 'input-field col s12'
}

export default reduxForm({
  form: 'editadmin',
  fields: [ 'password', 'confirm' ],
  validate: editadminValidation
})(CssModules(EditAdministratorForm, styles))
