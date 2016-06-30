import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import Panel from '../../components/Panel/Panel'
import MediaCarousel from '../../components/MediaCarousel/MediaCarousel'
import IconLinks from '../../components/IconLinks/IconLinks'
import RepoLink from '../../components/RepoLink/RepoLink'
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
    this.scrollToTop = this.scrollToTop.bind(this)
  }

  componentWillUpdate () {
    if(this.scrollTopTimer !== null) {
      clearInterval(this.scrollTopTimer)
      this.scrollTopTimer = null
    }
  }

  /**
   * Back to top btn click
   * @param event : object
   */
  scrollToTop () {
    const doc = document.documentElement
    let top = null
    this.scrollTopTimer = setInterval(() => {
      top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      if (top > 0) {
        window.scrollTo(0, top - 30)
      } else {
        clearInterval(this.scrollTopTimer)
        this.scrollTopTimer = null
      }
    }, this.props.scrollSpeed)
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
      <div styleName="cf-projects">
        <Link styleName="projects-back-btn" className="btn" to="/"><i className="material-icons left">arrow_back</i>profile</Link>
        <h1 styleName="project-name">{project.name}</h1>
        <span styleName="project-client">{project.client}</span>
        <MediaCarousel data={project.media} />
        <IconLinks icon="web" data={project.linkWeb} />
        <RepoLink data={project.repo} />
        <IconTechChips icon="code" data={project.projectTech} />
        <div styleName="cf-project-description" dangerouslySetInnerHTML={this.getSanitisedHtml(project.description)}></div>
        <CodeSnippet data={project.codeSnippet} />
        <a onClick={this.scrollToTop} styleName="projects-back-to-top" className="btn"><i className="material-icons left">arrow_upward</i>Top</a>
      </div>
    )
  }

}

Projects.propTypes = {
  projectsData: PropTypes.object,
  params: PropTypes.object,
  scrollSpeed: PropTypes.number
}

Projects.defaultProps = {
  scrollSpeed: 10
}

export default CssModules(Projects, styles)
