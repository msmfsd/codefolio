/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import CssModules from 'react-css-modules'
import styles from './FormMediaEditor.css'

/**
 * @class FormMediaEditor
 * @extends Component
 */
class FormMediaEditor extends Component {

  constructor (props) {
    super(props)
    this.state = { files: [] }
  }

  /**
   * On files selected for update
   * @param files : object
   */
  onDrop (files) {
    this.setState({ files: files })
    this.props.uploadAsyncFunc(files, this.props.auth.token)
  }

  render () {
    const { projects } = this.props
    return (
      <div styleName="form-media-editor">
        <div styleName="dropzone-loader">
          <div className={projects.newProjectLoadingFiles ? 'show' : 'hide'} styleName="loading-div">
            <div styleName="cf-progress"><div className="progress"><div className="indeterminate"></div></div></div>
          </div>
          <Dropzone styleName="dropzone" onDrop={this.onDrop.bind(this)}>
            <div>Drop JPG/PNG file/s here, or click to browse your files.</div>
          </Dropzone>
        </div>
        <ul className={this.state.files && !projects.newProjectLoadingFilesError ? 'show' : 'hide'}>{this.state.files.map((obj, index) => {
          return (
            <li key={index}>
              <figure>
                <img src={obj.preview} width="40" />
              </figure>
            </li>
          )
        })}</ul>
        <div styleName="form-messages">{projects.newProjectLoadingFilesError && projects.newProjectLoadingFilesErrMessage}</div>
        <div styleName="form-messages" className={projects.newProjectLoadingFilesSuccess ? 'show' : 'hide'}>Files uploaded successfully</div>
      </div>
    )
  }

}

FormMediaEditor.propTypes = {
  auth: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  uploadAsyncFunc: PropTypes.func.isRequired
}

export default CssModules(FormMediaEditor, styles)
