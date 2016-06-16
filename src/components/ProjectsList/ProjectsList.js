/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import styles from './ProjectsList.css'

/**
 * @class ProjectsList
 * @extends Component
 */
class ProjectsList extends Component {

  constructor (props) {
    super(props)
    this.state = { }
  }

  componentDidMount () {
    this.timer = setTimeout(() => {
      // materialize animate list
      Materialize.showStaggeredList('#cf-projects-list')
      // clear
      clearTimeout(this.timer)
    }, this.props.animationDelay)
  }

  componentWillUnmount () {
    if(this.timer !== null) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  render () {
    let projects = this.props.data.map((obj, index) => {
      return (<li key={index} styleName="cf-project-link-item">
        <Link activeClassName="active-link" to={"/projects/" + obj.projectId}>
          <h6 className="truncate">{obj.projectTitle}</h6>
          <span className="truncate">{obj.projectRole}</span>
          <i className="material-icons">chevron_right</i>
        </Link>
      </li>)
    })
    return (
      <ul styleName="cf-projects-list" id="cf-projects-list">{projects}</ul>
    )
  }

}

ProjectsList.propTypes = {
  animationDelay: PropTypes.number,
  data: PropTypes.array
}
ProjectsList.defaultProps = {
  animationDelay: 1500
}

export default CssModules(ProjectsList, styles)
