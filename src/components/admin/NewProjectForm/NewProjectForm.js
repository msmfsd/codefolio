/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
 /* eslint no-unused-vars: "off" */
import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import slugger from 'slugger'
import CssModules from 'react-css-modules'
import FormLinksEditor from '../FormLinksEditor/FormLinksEditor'
import FormArrayEditor from '../FormArrayEditor/FormArrayEditor'
import FormMediaEditor from '../FormMediaEditor/FormMediaEditor'
import { createValidator, required, maxLength, noSpecialCharacters, ifDisplayYes, requiredArr } from '../../../utils/validate'
import styles from './NewProjectForm.css'

// fields & client validation
const fields = [
  'name',
  'role',
  'description',
  'client',
  'viewOrder',
  'sticky',
  'repoDisplay',
  'repoUrl',
  'repoUser',
  'repoName',
  'codeDisplay',
  'code',
  'projectTech',
  'linkWeb',
  'media'
]
const newProjectValidation = createValidator({
  name: [required, maxLength(40), noSpecialCharacters],
  role: [required, maxLength(40)],
  description: [required],
  client: [required, maxLength(80)],
  repoUrl: [ifDisplayYes('repoDisplay', 'yes')],
  code: [ifDisplayYes('codeDisplay', 'yes')],
  projectTech: [requiredArr]
})

/**
 * @class NewProjectForm
 * @extends Component
 */
class NewProjectForm extends Component {

  componentDidMount () {
    // reset form
    this.props.newProjectReset()
  }

  /**
   * Allow live form edits to update profile state on blur
   * Why? So other state updates dont reset their values pre submit
   * @param e : object
   */
  onBlurUpdate (e) {
    this.props.newProjectUpdateField(e.currentTarget.name, e.currentTarget.value)
  }

  render () {
    const {
      auth,
      newProject,
      newProjectAsync,
      handleSubmit,
      defaultInputClasses,
      newProjectOnPushFieldArray,
      newProjectOnSpliceFieldArray,
      newProjectAddLink,
      newProjectRemoveLink,
      newProjectRemoveMedia,
      newProjectUploadFilesAsync,
      fields: {
        name,
        role,
        description,
        client,
        viewOrder,
        sticky,
        repoDisplay,
        repoUrl,
        repoUser,
        repoName,
        codeDisplay,
        code,
        projectTech,
        linkWeb,
        media
      }
    } = this.props

    return (
      <div>
        <div styleName="form-container">
          <div className="row">
            <div styleName="card-padding" className={newProject.newProjectSuccess ? 'card-panel show' : 'card-panel hide'}>
              <span>Project created successfully: <a href={'/projects/' + slugger(name.value)} target="_blank">View project</a></span>
            </div>
          </div>
          <div className="row">
            <form className={newProject.newProjectSuccess ? 'hide' : 'show'} onSubmit={handleSubmit(data => newProjectAsync(data, auth.token))}>
              <div className="col s12">
                <h3>Create new project</h3>
                <p>Complete fields and submit to create a project.</p>
              </div>
              <div className={defaultInputClasses}><h5>Project details</h5></div>
              <div className={defaultInputClasses}>
                <h6>Name:<div className="hint">Must be unique and can contain letters, numbers and spaces only</div></h6>
                <input type="text" placeholder="Enter project name" {...name} onBlur={(e) => this.onBlurUpdate(e)}/>
                {name.touched && name.error && <div className="input-field-message">{name.error}</div>}
              </div>
              <div className={defaultInputClasses}>
                <h6>Your role:<div className="hint">eg. Front-end developer & UX</div></h6>
                <input type="text" placeholder="Enter your role" {...role} onBlur={(e) => this.onBlurUpdate(e)}/>
                {role.touched && role.error && <div className="input-field-message">{role.error}</div>}
              </div>
              <div className={defaultInputClasses}>
                <h6>Client:<div className="hint">eg. Startup-X & Digital agency Y</div></h6>
                <input type="text" placeholder="Enter project client" {...client} onBlur={(e) => this.onBlurUpdate(e)}/>
                {client.touched && client.error && <div className="input-field-message">{client.error}</div>}
              </div>
              <div className={defaultInputClasses}>
                <h6>Project description:<div className="hint">Optional. Text must be manually wrapped in &lt;p&gt; tags</div></h6>
                <textarea rows="8" placeholder="Enter project description" {...description} onBlur={(e) => this.onBlurUpdate(e)}/>
                {description.touched && description.error && <div className="input-field-message">{description.error}</div>}
              </div>
              <div className={defaultInputClasses + ' m6'}>
                <h6>View Order:<div className="hint">Project order</div></h6>
                <input type="number" min="0" {...viewOrder} onBlur={(e) => this.onBlurUpdate(e)}/>
                  {viewOrder.touched && viewOrder.error && <div className="input-field-message">{viewOrder.error}</div>}
              </div>
              <div className={defaultInputClasses + ' m6'}>
                <h6>Feature project?:<div className="hint">0 = no, 1 = yes</div></h6>
                <input type="number" min="0" max="1" {...sticky} onBlur={(e) => this.onBlurUpdate(e)}/>
                  {sticky.touched && sticky.error && <div className="input-field-message">{sticky.error}</div>}
              </div>
              <div className={defaultInputClasses}><h5>Project media</h5></div>
              <div className={defaultInputClasses}>
                <h6>Upload project screenshots:<div className="hint">Max 1MB image files allowed</div></h6>
                <FormMediaEditor auth={auth} newProject={newProject} uploadAsyncFunc={newProjectUploadFilesAsync} removeMediaItemFunc={newProjectRemoveMedia} />
              </div>
              <div className={defaultInputClasses}><h5>Project repo</h5></div>
              <div className={defaultInputClasses + ' m6'}>
                <h6>Display repo?:<div className="hint">Repo details are optional</div></h6>
                <input type="radio" {...repoDisplay} value="yes" checked={repoDisplay.value === 'yes'} onBlur={(e) => this.onBlurUpdate(e)}/>&nbsp;Yes
                <input type="radio" {...repoDisplay} value="no" checked={repoDisplay.value === 'no'} onBlur={(e) => this.onBlurUpdate(e)}/>&nbsp;No
              </div>
              <div className={repoDisplay.value === 'yes' ? 'show' : 'hide'}>
                <div className={defaultInputClasses + ' m6'}>
                  <h6>Repo URL:<div className="hint">eg. https://github.com/torvalds/linux</div></h6>
                  <input type="text" placeholder="Enter full URL" {...repoUrl} onBlur={(e) => this.onBlurUpdate(e)}/>
                  {repoUrl.touched && repoUrl.error && <div className="input-field-message">{repoUrl.error}</div>}
                </div>
                <div className={defaultInputClasses + ' m6'}>
                  <h6>Repo user:<div className="hint">eg. torvalds</div></h6>
                  <input type="text" placeholder="Enter repo user" {...repoUser} onBlur={(e) => this.onBlurUpdate(e)}/>
                  {repoUser.touched && repoUser.error && <div className="input-field-message">{repoUser.error}</div>}
                </div>
                <div className={defaultInputClasses + ' m6'}>
                  <h6>Repo name:<div className="hint">eg. linux</div></h6>
                  <input type="text" placeholder="Enter repo name" {...repoName} onBlur={(e) => this.onBlurUpdate(e)}/>
                  {repoName.touched && repoName.error && <div className="input-field-message">{repoName.error}</div>}
                </div>
              </div>
              <div className={defaultInputClasses}><h5>Project code snippet</h5></div>
              <div className={defaultInputClasses}>
                <h6>Display code snippet?:<div className="hint">Code snippet is optional</div></h6>
                <input type="radio" {...codeDisplay} value="yes" checked={codeDisplay.value === 'yes'} onBlur={(e) => this.onBlurUpdate(e)}/>&nbsp;Yes
                <input type="radio" {...codeDisplay} value="no" checked={codeDisplay.value === 'no'} onBlur={(e) => this.onBlurUpdate(e)}/>&nbsp;No
              </div>
              <div className={codeDisplay.value === 'yes' ? 'show' : 'hide'}>
                <div className={defaultInputClasses}>
                  <h6>Code:<div className="hint">Paste raw code here</div></h6>
                  <textarea rows="8" placeholder="Enter code" {...code} onBlur={(e) => this.onBlurUpdate(e)}/>
                  {code.touched && code.error && <div className="input-field-message">{code.error}</div>}
                </div>
              </div>
              <div className={defaultInputClasses}><h5>Project links</h5></div>
              <div styleName="table-div" className={defaultInputClasses}>
                <h6>Add up to 2 project links:<div className="hint">eg. linux.org &#126; http://linux.org/v2</div></h6>
                <FormLinksEditor fields={linkWeb} linkGroup={'linkWeb'} addLinkFunc={newProjectAddLink} removeLinkFunc={newProjectRemoveLink} max={2} />
              </div>
              <div className={defaultInputClasses}><h5>Project tech</h5></div>
              <div styleName="table-div" className={defaultInputClasses}>
                <h6>Add up to 10 project technologies:<div className="hint">eg. C++, NoSQL, jQuery, CSS, UX, Elm, Nginx, Docker, React</div></h6>
                <FormArrayEditor fields={projectTech} fieldName={'projectTech'} addItemFunc={newProjectOnPushFieldArray} removeItemFunc={newProjectOnSpliceFieldArray} max={10} />
                {projectTech.touched && projectTech.error && <div className="input-field-message">{projectTech.error}</div>}
              </div>
              <div className={defaultInputClasses}><h5>Create new project</h5></div>
              <div styleName="form-messages" className="col s12">{newProject.newProjectError && newProject.newProjectErrMessage}</div>
              <div className={defaultInputClasses}>
                <button styleName="form-btn" className={newProject.newProjectLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} type="submit" disabled={newProject.newProjectLoading || newProject.newProjectFilesLoading}><i className="material-icons">settings</i><span>Create project</span></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

NewProjectForm.propTypes = {
  auth: PropTypes.object.isRequired,
  newProject: PropTypes.object.isRequired,
  newProjectAsync: PropTypes.func,
  newProjectReset: PropTypes.func,
  newProjectUploadFilesAsync: PropTypes.func,
  newProjectOnPushFieldArray: PropTypes.func,
  newProjectOnSpliceFieldArray: PropTypes.func,
  newProjectAddLink: PropTypes.func,
  newProjectRemoveLink: PropTypes.func,
  newProjectUpdateField: PropTypes.func.isRequired,
  newProjectRemoveMedia: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  defaultInputClasses: PropTypes.string
}

NewProjectForm.defaultProps = {
  defaultInputClasses: 'input-field col s12'
}

export default reduxForm({
  form: 'newproject',
  fields,
  validate: newProjectValidation
}, state => ({ initialValues: state.newProject }))(CssModules(NewProjectForm, styles))
