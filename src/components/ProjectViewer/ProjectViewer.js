/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import ImageGallery from 'react-image-gallery'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import Loader from '../../components/Loader/Loader'
import Panel from '../../components/Panel/Panel'
import IconLinks from '../../components/IconLinks/IconLinks'
import RepoLink from '../../components/RepoLink/RepoLink'
import IconTechChips from '../../components/IconTechChips/IconTechChips'
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet'
import styles from './ProjectViewer.css'

/**
 * @class ProjectViewer
 * @extends Component
 */
class ProjectViewer extends Component {

  constructor (props) {
    super(props)
    this.scrollToTop = this.scrollToTop.bind(this)
  }

  componentWillUpdate (newProps, newState) {
    if(this.scrollTopTimer !== null) {
      clearInterval(this.scrollTopTimer)
      this.scrollTopTimer = null
    }
    if(typeof this._imageGallery !== 'undefined') {
      this._imageGallery.slideToIndex(0)
    }
  }

  componentWillUnmount (){
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

  render() {
    const { projects } = this.props
    // async render states
    if(projects.loading || (!projects.hasLoaded && !projects.error)) {
      return (<div><Loader /></div>)
    } else if(projects.error) {
      return (<div><Panel message={'Error: ' + projects.errMesage} /></div>)
    } else {
      const slug = this.props.params.projectId
      const project = projects.data.find((item) => item.slug === slug)
      let images = []
      if(typeof project !== 'undefined') {
        images = project.media.map((img, index) => {
          return { original: '/uploads/projects/' + img, thumbnail: '/uploads/projects/' + img }
        })
      }
      return (
        <div styleName="cf-project">
          <Link styleName="projects-back-btn" className="btn" to="/"><i className="material-icons left">arrow_back</i>profile</Link>
          <h1 styleName="project-name">{project.name}</h1>
          <span styleName="project-client">{project.client}</span>
          <div styleName="project-gallery">
            <ImageGallery
            ref={i => this._imageGallery = i}
            items={images}
            slideInterval={2000}
            showNav={false}
            showThumbnails={true}/>
          </div>
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

}

ProjectViewer.propTypes = {
  projectsData: PropTypes.object,
  params: PropTypes.object,
  scrollSpeed: PropTypes.number
}

ProjectViewer.defaultProps = {
  scrollSpeed: 10
}

export default CssModules(ProjectViewer, styles)
