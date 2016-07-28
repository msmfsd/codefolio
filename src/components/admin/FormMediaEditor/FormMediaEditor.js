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
    this.state = {
      loading: null,
      uploadsComplete: null,
      previews: [],
      fileNames: []
    }
  }

  /**
   * On files selected for update
   * @param files : object
   */
  onDrop (files) {
    console.log('Received files: ', files);
    let fileNames = []
    let previews = files.map((obj, index) => {
      fileNames.push(obj.name)
      return (
        <li key={index}>
          <figure>
            <img src={obj.preview} width="60" />
            <figcaption>{obj.name}</figcaption>
          </figure>
        </li>
      )
    })
    this.setState({
      loading: true,
      previews: previews,
      fileNames: fileNames
    })
    setTimeout(() => {
      this.setState({
        loading: false,
        uploadsComplete: true
      })
      this.props.onUploadedFunc(this.state.fileNames)
    }, 2000)
  }

  render () {

    return (
      <div styleName="form-media-editor">
        <div styleName="dropzone-loader">
          <div className={this.state.loading ? 'show' : 'hide'} styleName="loading-div">
            <div styleName="cf-progress"><div className="progress"><div className="indeterminate"></div></div></div>
          </div>
          <Dropzone styleName="dropzone" onDrop={this.onDrop.bind(this)}>
            <div>Drop JPG/PNG file/s here, or click to browse your files.</div>
          </Dropzone>
        </div>
        <ul className={this.state.previews ? 'show' : 'hide'}>{this.state.previews}</ul>
      </div>
    )
  }

}

FormMediaEditor.propTypes = {
  onUploadedFunc: PropTypes.func.isRequired
}

export default CssModules(FormMediaEditor, styles)
