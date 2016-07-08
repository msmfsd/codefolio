/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import md5 from 'md5'
import styles from './Avatar.css'

/**
 * @class Avatar
 * @extends Component
 */
class Avatar extends Component {

  render () {
    // map data
    const inlineStyle = {}
    let imgSrc = ''
    // wait for data to update and re render
    if(this.props.data) {
      switch (this.props.data.use) {
        case 'defaultAvatar':
          imgSrc = this.props.data.defaultAvatar
          break
        case 'gravitarEmail':
          imgSrc = 'http://www.gravatar.com/avatar/' + md5(this.props.data.gravitarEmail) + '.jpg'
          break
        case 'customAvatar':
          imgSrc = '/uploads/avatar/' + this.props.data.customAvatar
          break
        default:
          imgSrc = this.props.data.defaultAvatar
      }
      inlineStyle.backgroundImage = 'url(' + imgSrc + ')'
    }
    // render
    return (
      <figure style={inlineStyle} styleName="cf-avatar" className="hoverable"></figure>
    )
  }

}

Avatar.propTypes = {
  data: PropTypes.object
}

export default CssModules(Avatar, styles)
