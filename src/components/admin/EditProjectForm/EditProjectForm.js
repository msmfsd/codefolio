/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import CssModules from 'react-css-modules'
import { createValidator, required, maxLength } from '../../../utils/validate'
import styles from './EditProjectForm.css'

// client validation
const editProjectValidation = createValidator({
  name: [required, maxLength(40)]
})

/**
 * @class EditProjectForm
 * @extends Component
 */
class EditProjectForm extends Component {

  render () {
    const {
      auth,
      projects,
      editProjectAsync,
      handleSubmit,
      defaultInputClasses,
      fields: { name }
    } = this.props
    return (
      <div>
        <div styleName="form-container">
          <div className="row">
            <form onSubmit={handleSubmit(data => editProjectAsync(data, auth.token))}>
              <div className="col s12">
                <h3>Edit project: {this.props.params.projectId}</h3>
                <p>Complete fields and submit to create a project.</p>
              </div>
              <div styleName="form-messages" className="col s12">{projects.newProjectError && projects.newProjectErrMessage}</div>
              <div className={defaultInputClasses}>
                <button styleName="form-btn" className={projects.newProjectLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} type="submit" disabled={projects.newProjectLoading}><i className="material-icons">settings</i><span>Add new project</span></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

EditProjectForm.propTypes = {
  auth: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  editProjectAsync: PropTypes.func,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  defaultInputClasses: PropTypes.string
}

EditProjectForm.defaultProps = {
  defaultInputClasses: 'input-field col s12'
}

export default reduxForm({
  form: 'editProject',
  fields: [ 'name' ],
  validate: editProjectValidation
})(CssModules(EditProjectForm, styles))
