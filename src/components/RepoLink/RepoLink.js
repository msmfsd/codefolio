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
 * @extends {Component}
 */
class RepoLink extends Component {

  constructor (props) {
    super(props)
    this.state = {
      stars: 0
    }
    this.getRepoStars = this.getRepoStars.bind(this)
  }

  componentDidMount () {
    if(this.props.data.display === 'yes') {
      this.getRepoStars()
    }
  }

  componentDidUpdate () {
    if(this.props.data.display === 'yes') {
      this.getRepoStars()
    }
  }

  /**
   * Get github repo stargazers count
   */
  getRepoStars () {
    let _this = this
    // Github API no auth rate limit of 60 exceded?
    fetch('https://api.github.com/rate_limit')
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      }).then((ratelimitjson) => {
        if(ratelimitjson.rate.remaining > 0) {
          // limit ok so fetch repo stargazers_count
          fetch('https://api.github.com/repos/' + this.props.data.repoUser + '/' + this.props.data.repoName)
            .then((response) => {
              if (response.status >= 200 && response.status < 300) {
                return response.json()
              } else {
                return false
              }
            }).then((json) => {
              if(json.stargazers_count) {
                _this.setState({ stars: json.stargazers_count })
              }
            })
        }
      })
  }

  render () {

    return (
      <div className={this.props.data.display === 'yes' ? 'show' : 'hide'} styleName="cf-repolink">
        <i className="material-icons left cf-icon-left">storage</i>
        <span styleName="repolink-group">
          <a target="_blank" href={this.props.data.repoUrl}>{this.props.data.repoUrl}</a>
        </span>
        <span className={this.state.stars === 0 ? 'hide' : ''} styleName="repolink-watchers">
          <i className="material-icons left">star rate</i>
          {this.state.stars}
        </span>
      </div>
    )
  }

}

RepoLink.propTypes = {
  data: PropTypes.object
}

RepoLink = CssModules(RepoLink, styles)
export default RepoLink
