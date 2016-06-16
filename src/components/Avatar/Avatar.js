/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component } from 'react'
import CssModules from 'react-css-modules'
import styles from './Avatar.css'

/**
 * @class Avatar
 * @extends Component
 */
class Avatar extends Component {

  constructor (props) {
    super(props)
    this.state = { }
  }

  render () {
    return (
      <figure styleName="cf-avatar" className="hoverable"></figure>
    )
  }

}

Avatar.propTypes = {}

export default CssModules(Avatar, styles)
