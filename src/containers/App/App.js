/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import ProjectsList from '../../components/ProjectsList/ProjectsList'
import styles from './App.css'

/*
  NOTE:
  Most of your components should simply take some data from props and render it. However, sometimes you need to respond to user input, a server request or the passage of time. For this you use state.

  Try to keep as many of your components as possible stateless. By doing this you'll isolate the state to its most logical place and minimize redundancy, making it easier to reason about your application.

  A common pattern is to create several stateless components that just render data, and have a stateful component above them in the hierarchy that passes its state to its children via props. The stateful component encapsulates all of the interaction logic, while the stateless components take care of rendering data in a declarative way.
  NOTE:
  Usually, a component's children (this.props.children) is an array of components
*/

/**
 * @class App
 * @extends Component
 */
class App extends Component {

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    // ensure all CDN libs are defined
    if(typeof $ === 'undefined' || typeof Materialize === 'undefined' || typeof Prism === 'undefined') {
      throw new Error('CODEFOLIO ERROR: CDN lib undefined')
    }
  }

  componentDidMount () {
    // dynamically set body classes
    this.setBodyClass(this.props.bodyClass)
    // initialise any non-react dom manipulation
    $('#cf-button-collapse').sideNav({ closeOnClick: true })
  }

  /**
   * Method to retrieve body classes
   * @param classes
   * @returns {}
   */
  setBodyClass (classes) {
    // TODO get profile setting - theme? || if bgimage = 1 etc.
    for (let value of classes) {
      document.body.classList.add(value)
    }
  }

  render () {
    return (
      <div styleName="cf-container" className="container">
        <div className="row">
          <div className="col s12" styleName="cf-main">
            <div styleName="cf-main-inner"></div>
            <div styleName="cf-main-divider" className="hide-on-med-and-down"></div>
            <div className="row">
              <div styleName="cf-nav" className="col s12 l3 no-padding">
                <Link styleName="cf-logo" to="/">Codefolio</Link>
                <a href="#" id="cf-button-collapse" data-activates="cf-projects" styleName="cf-button-collapse">
                  <i className="material-icons">menu</i>
                </a>
                <div id="cf-projects" styleName="cf-projects">
                  <ProjectsList data={this.props.projectsListData} />
                </div>
              </div>
              <div styleName="cf-content" className="col s12 l9 no-padding">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

App.propTypes = {
  children: PropTypes.object,
  bodyClass: PropTypes.array,
  theme: PropTypes.string,
  projectsListData: PropTypes.array
}
App.defaultProps = {
  bodyClass: ['cf-theme-dark', 'background-image-on'],
  theme: 'dark',
  projectsListData: [
    {projectId: 1, projectTitle: 'Cool Project API', projectRole: 'Lead Developer'},
    {projectId: 2, projectTitle: 'Project really really really long project name', projectRole: 'Developer'},
    {projectId: 3, projectTitle: 'Client CMS', projectRole: 'Backend Developer'},
    {projectId: 4, projectTitle: 'Email System UX', projectRole: 'Lead UX/UI tester'},
    {projectId: 5, projectTitle: 'Company website', projectRole: 'Designer + Developer'}
  ]
}

export default CssModules(App, styles)
