/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './AvatarEditor.css'

/**
 * @class AvatarEditor
 * @extends Component
 */
class AvatarEditor extends Component {

  /**
   * Allow live form edits to update profile state on blur
   * Why? So other state updates dont reset their values pre submit
   * @param e : object
   */
  onBlurUpdate () {
    this.props.updateAvatarFields(this.props.use.value, this.props.gravitarEmail.value, this.props.customAvatarFile.value)
  }

  render () {
    const { use, gravitarEmail, customAvatarFile, defaultInputClasses } = this.props
    return (
      <div styleName="avatar-editor">
        <div className={defaultInputClasses}>
          <div className="row">
            <div className="input-field col s12 l6">
              <h6>Select avatar type:</h6>
              <select className="browser-default" {...use} value={use.value} onBlur={(e) => this.onBlurUpdate(e)}>
                <option value="defaultAvatar">Default</option>
                <option value="gravitarEmail">Gravitar</option>
                <option value="customAvatar">Custom</option>
              </select>
            </div>
            <div className="input-field col s12 l6">
              <div className={use.value === 'gravitarEmail' ? 'show' : 'hide'}>
                <h6>Gravitar email address:</h6>
                <input type="text" placeholder="Enter your gravitar email" {...gravitarEmail} onBlur={(e) => this.onBlurUpdate(e)}/>
                {gravitarEmail.touched && gravitarEmail.error && <div className="input-field-message">{gravitarEmail.error}</div>}
              </div>
              <div className={use.value === 'customAvatar' ? 'show' : 'hide'}>
                <h6>Upload custom avatar:<div className="hint">Jpeg/PNG 200kb max</div></h6>
                <input type="file" {...customAvatarFile} value={null} accept=".png, .jpeg, .jpg" onBlur={(e) => this.onBlurUpdate(e)}/>
                {customAvatarFile.touched && customAvatarFile.error && <div className="input-field-message">{customAvatarFile.error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

AvatarEditor.propTypes = {
  use: PropTypes.object.isRequired,
  gravitarEmail: PropTypes.object.isRequired,
  customAvatar: PropTypes.object.isRequired,
  customAvatarFile: PropTypes.object.isRequired,
  updateAvatarFields: PropTypes.func.isRequired,
  defaultInputClasses: PropTypes.string
}

AvatarEditor.defaultProps = {
  defaultInputClasses: 'input-field col s12'
}

export default CssModules(AvatarEditor, styles)
