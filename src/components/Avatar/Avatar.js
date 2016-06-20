/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
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
    let url = this.props.data.use === 'avatarBase64' ? this.props.data.avatarBase64 : this.props.data.avatarURL
    let figureStyle = { backgroundImage: 'url(' + url + ')' }
    return (
      <figure style={figureStyle} styleName="cf-avatar" className="hoverable"></figure>
    )
  }

}

Avatar.propTypes = {
  data: PropTypes.object
}

export default CssModules(Avatar, styles)
