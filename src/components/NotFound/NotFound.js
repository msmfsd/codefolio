/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import styles from './NotFound.css'

/**
 * @class NotFound
 * @extends Component
 */
class NotFound extends Component {

  render () {
    return (
      <div styleName="cf-notfound">
        <h1>404</h1>
        <h3>Page Not found</h3>
        <p><strong>Struth!</strong> You're fricken lost mate, fair dinkum..</p>
        <Link styleName="not-found-back-btn" className="btn left" to="/"><i className="material-icons left">arrow_back</i>profile</Link>
      </div>
    )
  }

}

export default CssModules(NotFound, styles)
