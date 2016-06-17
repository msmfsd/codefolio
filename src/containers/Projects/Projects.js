import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import MediaCarousel from '../../components/MediaCarousel/MediaCarousel'
import IconLinks from '../../components/IconLinks/IconLinks'
import IconTechChips from '../../components/IconTechChips/IconTechChips'
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet'
import Loader from '../../components/Loader/Loader'
import styles from './Projects.css'

/**
 * @class Projects
 * @extends Component
 */
class Projects extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      projectData: { }
    }
  }

  componentDidMount () {
    this.timer = setTimeout(() => {
      this.setState({
        loading: false,
        projectData: {
          projectName: 'Cool project API',
          projectClient: 'Cool client, trendy agency',
          media: [
            {name: 'cool-project-api-01.png', desc: 'Cool website homepage'},
            {name: 'cool-project-api-02.png', desc: 'Lorem ipsum dolor ipsum lorem yeah'},
            {name: 'cool-project-api-03.png', desc: 'Website widget'},
            {name: 'cool-project-api-04.png', desc: ''}
          ],
          iconLinksWeb: [{name: 'link.to/livesite', url: 'http://link.to/livesite'}],
          iconLinksRepo: [{name: 'github.com/swoz/repo', url: 'https://github.com/swoz/repo'}],
          codeSnippetLanguage: 'language-javascript',
          codeSnippetCode: `/**
 * @class Polygon
 * @extends
 */
class Polygon {

  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }

}

/**
 * @class Square
 * @extends Polygon
 */
class Square extends Polygon {

  constructor(_length) {
    super(_length, _length);
    this.name = 'Square';
  }

  render() {
    var compiled = super.render();
    console.log(compiled);
  }

}

// Export module
export = {
  Polygon,
  Square
};`,
          projectDescription: `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`,
          projectTech: [
            {name: 'Node js'},
            {name: 'Express'},
            {name: 'Mongo'},
            {name: 'Angular'},
            {name: 'Twig'},
            {name: 'PHP'},
            {name: 'Nginx'}
          ]
        }
      })
      // clear
      clearTimeout(this.timer)
    }, 1000)
  }

  componentWillUnmount () {
    if(this.timer !== null) {
      clearTimeout(this.timer)
      this.timer = null
    }
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
    if(this.state.loading) {
      return (<Loader />)
    } else {
      return (
        <div styleName="cf-projects">
          <Link styleName="projects-back-btn" className="btn" to="/"><i className="material-icons left">arrow_back</i>profile</Link>
          <h1 styleName="project-name">{this.state.projectData.projectName}</h1>
          <span styleName="project-client">{this.state.projectData.projectClient}</span>
          <MediaCarousel data={this.state.projectData.media} />
          <IconLinks icon="web" data={this.state.projectData.iconLinksWeb} />
          <IconLinks icon="storage" data={this.state.projectData.iconLinksRepo} />
          <IconTechChips icon="code" data={this.state.projectData.projectTech} />
          <div styleName="cf-project-description" dangerouslySetInnerHTML={this.getSanitisedHtml(this.state.projectData.projectDescription)}></div>
          <CodeSnippet language={this.state.projectData.codeSnippetLanguage} code={this.state.projectData.codeSnippetCode} />
        </div>
      )
    }
  }

}

Projects.propTypes = { }

Projects.defaultProps = { }

export default CssModules(Projects, styles)
