/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './Panel.css'

/**
 * @class Panel
 * @extends Component
 */
class Panel extends Component {
  render () {
    return (
      <div styleName="message-panel" className="card-panel">{this.props.message}</div>
    )
  }
}

Panel.propTypes = {
  message: PropTypes.string.isRequired
}

export default CssModules(Panel, styles)
