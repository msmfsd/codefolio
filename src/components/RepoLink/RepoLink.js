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

  render () {
    // TODO get stars - https://www.npmjs.com/package/github-api
    const stars = 0
    if(!this.props.data.display) {
      return (<div className="hide"></div>)
    } else {
      return (
        <div styleName="cf-repolink">
          <i className="material-icons left cf-icon-left">storage</i>
          <span styleName="repolink-group">
            <a target="_blank" href={this.props.data.repoUrl}>{this.props.data.repoUrl}</a>
          </span>
          <span className={stars === 0 ? 'hide' : ''} styleName="repolink-watchers">
            <i className="material-icons left">star rate</i>
            {stars}
          </span>
        </div>
      )
    }
  }

}

RepoLink.propTypes = {
  data: PropTypes.object
}

export default CssModules(RepoLink, styles)
