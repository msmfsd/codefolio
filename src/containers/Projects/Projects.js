import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import Panel from '../../components/Panel/Panel'
import MediaCarousel from '../../components/MediaCarousel/MediaCarousel'
import IconLinks from '../../components/IconLinks/IconLinks'
import IconTechChips from '../../components/IconTechChips/IconTechChips'
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet'
import styles from './Projects.css'

/**
 * @class Projects
 * @extends Component
 */
class Projects extends Component {

  constructor (props) {
    super(props)
    this.state = {
      className: 'project-update project-update-anim'
    }
  }

  componentWillUpdate () {
    this.state.className = 'project-update'
    this.timer = setTimeout(() => {
      this.state.className = 'project-update project-update-anim'
      this.setState(this.state)
      // clear timer
      clearTimeout(this.timer)
      this.timer = null
    }, 300)
  }

  /**
   * Get html formatted
   * @param html : string
   * @returns {object}
   */
  getSanitisedHtml (html) {
    // TODO: alt way of formatting html string
    return {__html: html }
  }

  render () {
    // find matching slug
    let project = this.props.projectsData.data.find(obj => obj.slug === this.props.params.projectId)
    if(typeof project === 'undefined') {
      return (
        <Panel message={'Error: project not found: ' + this.props.params.projectId} />
      )
    }
    return (
      <div className={this.state.className} styleName="cf-projects">
        <Link styleName="projects-back-btn" className="btn" to="/"><i className="material-icons left">arrow_back</i>profile</Link>
        <h1 styleName="project-name">{project.name}</h1>
        <span styleName="project-client">{project.client}</span>
        <MediaCarousel data={project.media} />
        <IconLinks icon="web" data={project.linkWeb} />
        <IconLinks icon="storage" data={project.linkRepo} />
        <IconTechChips icon="code" data={project.projectTech} />
        <div styleName="cf-project-description" dangerouslySetInnerHTML={this.getSanitisedHtml(project.description)}></div>
        <CodeSnippet data={project.codeSnippet} />
      </div>
    )
  }

}

Projects.propTypes = {
  projectsData: PropTypes.object,
  params: PropTypes.object
}

export default CssModules(Projects, styles)
