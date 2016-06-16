import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
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
    this.state = { }
  }

  /**
   * Get icon link data
   * @param group : String
   * @returns {Array}
   */
  getIconLinks (group) {
    let arr = null
    switch (group) {
    case 'web':
      arr = this.props.projectWeb
      break;
    case 'repo':
      arr = this.props.projectRepo
      break;
    default:
      arr = []
    }
    return arr;
  }

  /**
   * Get media for carousel
   * @param projectId
   * @returns {Array}
   */
  getMedia (projectId) {
    let arr = [
      {name: 'cool-project-api-01.png', desc: 'Cool website homepage'},
      {name: 'cool-project-api-02.png', desc: 'Lorem ipsum dolor ipsum lorem yeah'},
      {name: 'cool-project-api-03.png', desc: 'Website widget'},
      {name: 'cool-project-api-04.png', desc: ''}
    ]
    return arr;
  }

  /**
   * Get code types used in project
   * @param projectId
   * @returns {Array}
   */
  getProjectCode (projectId) {
    let arr = [
      {name: 'Node js'},
      {name: 'Express'},
      {name: 'Mongo'},
      {name: 'Angular'},
      {name: 'Twig'},
      {name: 'PHP'},
      {name: 'Nginx'}
    ]
    return arr;
  }

  /**
   * Get html formatted project desc
   * @param projectId
   * @returns {Object}
   */
  getProjectDescription (projectId) {
    // TODO: alt way of formatting html string
    return {__html: this.props.projectDescription }
  }

  render () {
    return (
      <div styleName="cf-projects">
        <Link styleName="projects-back-btn" className="btn" to="/"><i className="material-icons left">arrow_back</i>profile</Link>
        <h1 styleName="project-name">Cool project API</h1>
        <span styleName="project-client">Cool client, trendy agency</span>
        <MediaCarousel data={this.getMedia(this.props.params.projectId)} />
        <IconLinks icon="web" data={this.getIconLinks('web')} />
        <IconLinks icon="storage" data={this.getIconLinks('repo')} />
        <IconTechChips icon="code" data={this.getProjectCode(this.props.params.projectId)} />
        <div styleName="cf-project-description" dangerouslySetInnerHTML={this.getProjectDescription(this.props.params.projectId)}></div>
        <CodeSnippet language={this.props.codeSnippetLanguage} code={this.props.codeSnippetCode} />
      </div>
    )
  }

}

Projects.propTypes = {
  params: PropTypes.object,
  projectWeb: PropTypes.array,
  projectRepo: PropTypes.array,
  projectDescription: PropTypes.string,
  codeSnippetLanguage: PropTypes.string,
  codeSnippetCode: PropTypes.string
}

Projects.defaultProps = {
  projectWeb: [
    {name: 'link.to/livesite', url: 'http://link.to/livesite'}
  ],
  projectRepo: [
    {name: 'github.com/swoz/repo', url: 'https://github.com/swoz/repo'}
  ],
  projectDescription: `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`,
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
  };`
}

export default CssModules(Projects, styles)
