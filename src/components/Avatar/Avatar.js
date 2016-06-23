/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import md5 from 'md5'
import ExternalConfig from 'ExternalConfig'
import styles from './Avatar.css'

/**
 * @class Avatar
 * @extends Component
 */
class Avatar extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    // avatar options: grvatarEmail, defaultAvatar, customAvatar
    const use = this.props.data.use
    const inlineStyle = {}
    let imgSrc = ''
    switch (use) {
      case 'defaultAvatar':
        imgSrc = this.props.data.defaultAvatar
        break
      case 'grvatarEmail':
        imgSrc = 'http://www.gravatar.com/avatar/' + md5(this.props.data.grvatarEmail) + '.jpg'
        break
      case 'customAvatar':
        imgSrc = ExternalConfig.API_URL + ExternalConfig.API_IMG_UPLOAD_DIR + 'avatar/' + this.props.data.customAvatar
        break
      default:
        imgSrc = this.props.data.defaultAvatar
    }
    inlineStyle.backgroundImage = 'url(' + imgSrc + ')'
    return (
      <figure style={inlineStyle} styleName="cf-avatar" className="hoverable"></figure>
    )
  }

}

Avatar.propTypes = {
  data: PropTypes.object
}

export default CssModules(Avatar, styles)
