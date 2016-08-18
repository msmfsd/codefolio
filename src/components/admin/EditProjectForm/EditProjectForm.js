/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
 /* eslint no-unused-vars: "off" */
import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { reduxForm } from 'redux-form'
import slugger from 'slugger'
import CssModules from 'react-css-modules'
import FormLinksEditor from '../FormLinksEditor/FormLinksEditor'
import FormArrayEditor from '../FormArrayEditor/FormArrayEditor'
import FormMediaEditor from '../FormMediaEditor/FormMediaEditor'
import { createValidator, required, maxLength, noSpecialCharacters, ifDisplayYes, requiredArr } from '../../../utils/validate'
import styles from './EditProjectForm.css'

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
const editProjectValidation = createValidator({
  name: [required, maxLength(40), noSpecialCharacters],
  role: [required, maxLength(40)],
  description: [required],
  client: [required, maxLength(80)],
  repoUrl: [ifDisplayYes('repoDisplay', 'yes')],
  code: [ifDisplayYes('codeDisplay', 'yes')],
  projectTech: [requiredArr]
})

/**
 * @class EditProjectForm
 * @extends {Component}
 */
class EditProjectForm extends Component {

  componentDidMount () {
    // prevent edit prior to projects state being loaded
    if(!this.props.projects.hasLoaded || this.props.projects.loading) {
      browserHistory.push('/admin')
    } else {
      // set form
      let currentProject = this.props.projects.data.find((obj) => obj.slug === this.props.params.projectId)
      if(currentProject) {
        this.props.editProjectReset()
        this.props.editProjectSet(currentProject)
      } else {
        browserHistory.push('/admin')
      }
    }
  }

  componentDidUpdate () {
    // scroll to first validation error
    if(this.props.submitFailed) {
      let div = document.getElementsByClassName('input-field-message')[0].offsetParent
      if(div) {
        window.scrollTo(0, div.offsetTop + 60)
      }
    }
  }

  /**
   * Allow live form edits to update profile state on blur
   * Why? So other state updates dont reset their values pre submit
   * @param {object} e - event object
   */
  onBlurUpdate (e) {
    this.props.editProjectUpdateField(e.currentTarget.name, e.currentTarget.value)
  }

  render () {
    const {
      auth,
      projects,
      editProject,
      editProjectAsync,
      handleSubmit,
      defaultInputClasses,
      editProjectOnPushFieldArray,
      editProjectOnSpliceFieldArray,
      editProjectAddLink,
      editProjectRemoveLink,
      editProjectRemoveMedia,
      editProjectUploadFilesAsync,
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
    const currentProject = projects.data.find((obj) => obj.slug === this.props.params.projectId)

    return (
      <div>
        <div styleName="form-container">
          <div className="row">
            <div styleName="card-padding" className={editProject.editProjectSuccess ? 'card-panel show' : 'card-panel hide'}>
              <span>Project edited successfully: <a href={'/projects/' + slugger(name.value)} target="_blank">View project</a></span>
            </div>
          </div>
          <div className="row">
            <form className={editProject.editProjectSuccess ? 'hide' : 'show'} onSubmit={handleSubmit(data => editProjectAsync(data, auth.token, currentProject._id))}>
              <div className="col s12">
                <h3>Edit: <span styleName="hl">{name.value}</span></h3>
                <p>Complete fields and submit to update this project.</p>
              </div>
              <div className={defaultInputClasses}><h5>Project details</h5></div>
              <div className={defaultInputClasses}>
                <h6>Name:<div className="hint">Cannot be modified</div></h6>
                <input type="text" readOnly={true} {...name}/>
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
                <h6>Project description:<div className="hint">Use <a style={{textDecoration: 'underline'}} href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Markdown</a> or plain text</div></h6>
                <textarea rows="8" placeholder="Enter project description" {...description} onBlur={(e) => this.onBlurUpdate(e)}/>
                {description.touched && description.error && <div className="input-field-message">{description.error}</div>}
              </div>
              <div className={defaultInputClasses + ' m6'}>
                <h6>View Order:<div className="hint">Project order</div></h6>
                <input type="number" min="0" {...viewOrder} onBlur={(e) => this.onBlurUpdate(e)}/>
                  {viewOrder.touched && viewOrder.error && <div className="input-field-message">{viewOrder.error}</div>}
              </div>
              <div className={defaultInputClasses + ' m6'}>
                <h6>Featured:<div className="hint">Always appear at top?</div></h6>
                <input type="number" min="0" max="1" {...sticky} onBlur={(e) => this.onBlurUpdate(e)}/>
                  {sticky.touched && sticky.error && <div className="input-field-message">{sticky.error}</div>}
              </div>
              <div className={defaultInputClasses}><h5>Project media</h5></div>
              <div className={defaultInputClasses}>
                <h6>Upload project screenshots:<div className="hint">Max 1MB image files allowed</div></h6>
                <FormMediaEditor auth={auth} editProject={editProject} uploadAsyncFunc={editProjectUploadFilesAsync} removeMediaItemFunc={editProjectRemoveMedia} />
              </div>
              <div className={defaultInputClasses}><h5>Project repo</h5></div>
              <div className={defaultInputClasses + ' m6'}>
                <h6>Display Github repo?:<div className="hint">Repo display is optional</div></h6>
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
                <FormLinksEditor fields={linkWeb} linkGroup={'linkWeb'} addLinkFunc={editProjectAddLink} removeLinkFunc={editProjectRemoveLink} max={2} />
              </div>
              <div className={defaultInputClasses}><h5>Project tech</h5></div>
              <div styleName="table-div" className={defaultInputClasses}>
                <h6>Add up to 10 project technologies:<div className="hint">eg. C++, NoSQL, jQuery, CSS, UX, Elm, Nginx, Docker, React</div></h6>
                <FormArrayEditor fields={projectTech} fieldName={'projectTech'} addItemFunc={editProjectOnPushFieldArray} removeItemFunc={editProjectOnSpliceFieldArray} max={10} />
                {projectTech.touched && projectTech.error && <div className="input-field-message">{projectTech.error}</div>}
              </div>
              <div className={defaultInputClasses}><h5>Save changes</h5></div>
              <div styleName="form-messages" className="col s12">{editProject.editProjectError && editProject.editProjectErrMessage}</div>
              <div className={defaultInputClasses}>
                <button styleName="form-btn" className={editProject.editProjectLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} type="submit" disabled={editProject.editProjectLoading || editProject.editProjectFilesLoading}><i className="material-icons">settings</i><span>Update project</span></button>
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
  editProject: PropTypes.object.isRequired,
  editProjectAsync: PropTypes.func,
  editProjectReset: PropTypes.func,
  editProjectSet: PropTypes.func,
  editProjectUploadFilesAsync: PropTypes.func,
  editProjectOnPushFieldArray: PropTypes.func,
  editProjectOnSpliceFieldArray: PropTypes.func,
  editProjectAddLink: PropTypes.func,
  editProjectRemoveLink: PropTypes.func,
  editProjectUpdateField: PropTypes.func.isRequired,
  editProjectRemoveMedia: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool,
  defaultInputClasses: PropTypes.string,
  params: PropTypes.object
}

EditProjectForm.defaultProps = {
  defaultInputClasses: 'input-field col s12'
}

export default reduxForm({
  form: 'editproject',
  fields,
  validate: editProjectValidation
}, state => ({ initialValues: state.editProject }))(CssModules(EditProjectForm, styles))
