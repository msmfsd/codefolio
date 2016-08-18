/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
 /* eslint no-return-assign: "off" */
 /* eslint react/prop-types: "off" */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Markdown from 'react-markdown'
import CssModules from 'react-css-modules'
import __CONFIG__ from '../../../config'
import Slider from '../Slider/Slider'
import Loader from '../Loader/Loader'
import Panel from '../Panel/Panel'
import IconLinks from '../IconLinks/IconLinks'
import RepoLink from '../RepoLink/RepoLink'
import IconTechChips from '../IconTechChips/IconTechChips'
import CodeSnippet from '../CodeSnippet/CodeSnippet'
import ScrollTopButton from '../ScrollTopButton/ScrollTopButton'
import styles from './ProjectViewer.css'

/**
 * @class ProjectViewer
 * @extends {Component}
 */
class ProjectViewer extends Component {

  componentWillUpdate () {
    // on route update reset gallery index
    if(typeof this._imageGallery !== 'undefined') {
      // TODO this._imageGallery.slideToIndex(0)
    }
  }

  render () {
    // vars
    const { projects } = this.props
    const API_URL = process.env.NODE_ENV !== 'production' ? __CONFIG__.API_DEV_URL : __CONFIG__.API_PROD_URL
    const slug = this.props.params.projectId
    let project = null
    let images = []
    // async render states
    if(projects.loading || (!projects.hasLoaded && !projects.error)) {
      return (<div><Loader /></div>)
    } else if(projects.error) {
      return (<div><Panel message={'Error: ' + projects.errMessage} /></div>)
    } else {
      // async success - get project with route paramater
      project = projects.data.find((item) => item.slug === slug)
      if(typeof project !== 'undefined') {
        images = project.media.map((img, index) => {
          let imgUrl = API_URL + '/uploads/projects/' + img
          return <div key={index} styleName="cf-slide" style={{ backgroundImage: 'url(' + imgUrl + ')' }}></div>
        })
      }
      // render project
      return (
        <div styleName="cf-project">
          <Link styleName="projects-back-btn" className="btn" to="/"><i className="material-icons left">arrow_back</i>profile</Link>
          <h1 styleName="project-name">{project.name}</h1>
          <span styleName="project-client">{project.client}</span>
          <div styleName="project-gallery" className={images && images.length > 0 ? 'show' : 'hide'}>
            <Slider loop={true} showNav={false}>{images}</Slider>
          </div>
          <IconLinks icon="web" data={project.linkWeb} />
          <RepoLink data={project.repo} />
          <IconTechChips icon="code" data={project.projectTech} />
          <div styleName="cf-project-description" className="cf-markdown">
            <Markdown source={project.description} />
          </div>
          <CodeSnippet data={project.codeSnippet} />
          <ScrollTopButton />
        </div>
      )
    }
  }

}

ProjectViewer.propTypes = {
  projects: PropTypes.object,
  params: PropTypes.object
}

ProjectViewer = CssModules(ProjectViewer, styles)
export default ProjectViewer
