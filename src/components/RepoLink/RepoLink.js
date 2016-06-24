/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './RepoLink.css'

/**
 * @class RepoLink
 * @extends Component
 */
class RepoLink extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div styleName="cf-repolink">
        <i className="material-icons left">storage</i>
        <span styleName="repolink-group">
          <a target="_blank" href={this.props.repoUrl}>{this.props.repoUrl}</a>
        </span>
        <span className="hide" styleName="repolink-stars">Stars: {this.props.starsCount}</span>
      </div>
    )
  }

}

RepoLink.propTypes = {
  repoUrl: PropTypes.string,
  starsCount: PropTypes.number
}

export default CssModules(RepoLink, styles)
