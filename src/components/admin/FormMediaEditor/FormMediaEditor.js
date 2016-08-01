/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import CssModules from 'react-css-modules'
import __CONFIG__ from '../../../../cf.config'
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

  /**
   * Remove media from store/form
   * @param index : number
   * @param e : dom node event object
   */
  removeMediaItem (index, e) {
    e.preventDefault()
    this.props.removeMediaItemFunc(index)
  }

  render () {
    const { editProject } = this.props
    const API_URL = process.env.NODE_ENV !== 'production' ? __CONFIG__.development.API_URL : __CONFIG__.production.API_URL
    return (
      <div styleName="form-media-editor">
        <ul styleName="media-items" className={editProject.media.length > 0 ? 'show' : 'hide'}>{editProject.media.map((obj, index) => {
          return (
            <li key={index}>
              <figure>
                <img src={API_URL + '/uploads/projects/' + obj} width="50" />
                <button data-index={index} onClick={this.removeMediaItem.bind(this, index)} className="btn-floating btn-small right"><i className="material-icons">delete</i></button>
              </figure>
            </li>
          )
        })}</ul>
        <div styleName="dropzone-loader">
          <div className={editProject.editProjectFilesLoading ? 'show' : 'hide'} styleName="loading-div">
            <div styleName="cf-progress"><div className="progress"><div className="indeterminate"></div></div></div>
          </div>
          <Dropzone styleName="dropzone" onDrop={this.onDrop.bind(this)}>
            <div>Drop JPG/PNG file/s here, or click to browse your files.</div>
          </Dropzone>
        </div>
        <ul className={this.state.files && !editProject.editProjectFilesError && !editProject.editProjectFilesSuccess ? 'show' : 'hide'}>{this.state.files.map((obj, index) => {
          return (
            <li key={index}>
              <figure>
                <img src={obj.preview} width="40" />
              </figure>
            </li>
          )
        })}</ul>
        <div styleName="form-messages">{editProject.editProjectFilesError && editProject.editProjectFilesErrMessage}</div>
        <div styleName="form-messages" className={editProject.editProjectFilesSuccess ? 'show' : 'hide'}>Files uploaded successfully</div>
      </div>
    )
  }

}

FormMediaEditor.propTypes = {
  auth: PropTypes.object.isRequired,
  editProject: PropTypes.object.isRequired,
  uploadAsyncFunc: PropTypes.func.isRequired,
  removeMediaItemFunc: PropTypes.func.isRequired
}

export default CssModules(FormMediaEditor, styles)
