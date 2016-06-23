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

// TODO var imgSourseUrl = "http://www.gravatar.com/avatar/" + md5(this.props.email);
// TODO update schema for gravitar option

/**
 * @class Avatar
 * @extends Component
 */
class Avatar extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const useDefault = this.props.data.useDefault
    let bgImage = useDefault ? this.props.data.defaultAvatar : ExternalConfig.API_URL + ExternalConfig.API_IMG_UPLOAD_DIR + 'avatar/' + this.props.data.customAvatar
    let figureStyle = { backgroundImage: 'url(' + bgImage + ')' }
    return (
      <figure style={figureStyle} styleName="cf-avatar" className="hoverable"></figure>
    )
  }

}

Avatar.propTypes = {
  data: PropTypes.object
}

export default CssModules(Avatar, styles)
