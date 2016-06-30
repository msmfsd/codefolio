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
    if(!this.props.data.display) {
      return (<div className="hide"></div>)
    } else {
      return (
        <div styleName="cf-repolink">
          <i className="material-icons left cf-icon-left">storage</i>
          <span styleName="repolink-group">
            <a target="_blank" href={this.props.data.repoUrl}>{this.props.data.repoUrl}</a>
          </span>
          <span className={this.props.data.watchers === 0 ? 'hide' : ''} styleName="repolink-watchers">
            <i className="material-icons left">star rate</i>
            {this.props.data.watchers}
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
