/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component } from 'react'
import CssModules from 'react-css-modules'
import styles from './Loader.css'

/**
 * @class Loader
 * @extends Component
 */
class Loader extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div styleName="cf-progress">
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      </div>
    )
  }

}

export default CssModules(Loader, styles)
