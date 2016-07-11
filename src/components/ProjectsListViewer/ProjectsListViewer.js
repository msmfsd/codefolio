/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/* eslint react/prop-types: "off" */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import Loader from '../Loader/Loader'
import Panel from '../Panel/Panel'
import styles from './ProjectsListViewer.css'

/**
 * @class ProjectsListViewer
 * @extends Component
 */
class ProjectsListViewer extends Component {

  constructor (props) {
    super(props)
    // TODO: remove listShown state once react-router v3 release
    this.state = {
      listShown: false
    }
  }

  componentDidMount () {
    if(!this.props.projects.hasLoaded) {
      this.props.fetchProjectsAsync()
    }
  }

  componentDidUpdate () {
    if(!this.state.listShown && this.props.projects.hasLoaded && !this.props.projects.error) {
      this.updateLayout()
    }
  }

  /**
   * Show projects list
   * @returns void
   */
  updateLayout () {
    this.setState({ listShown: true })
    Materialize.showStaggeredList('#cf-projects-list')
  }

  render () {
    // map data
    const { projects } = this.props
    let projectslist = projects.data.map((obj, index) => {
      return (<li key={index} styleName="cf-project-link-item">
          <Link className="waves-effect" activeClassName="active-link" to={'/projects/' + obj.slug}>
            <h6 className="truncate">{obj.name}</h6>
            <span className="truncate">{obj.role}</span>
            <i className="material-icons">chevron_right</i>
          </Link>
        </li>)
    })
    // async render states
    if(projects.loading || (!projects.hasLoaded && !projects.error)) {
      return (<div><Loader /></div>)
    } else if(projects.error) {
      return (<div><Panel message={'Error: ' + projects.errMesage} /></div>)
    } else {
      return (<ul styleName="cf-projects-list" id="cf-projects-list">{projectslist}</ul>)
    }
  }

}

ProjectsListViewer.propTypes = {
  projects: PropTypes.object.isRequired
}

export default CssModules(ProjectsListViewer, styles)
