/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import ExternalConfig from 'ExternalConfig'
import Api from '../../utils/api'
import Loader from '../../components/Loader/Loader'
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
    this.state = {
      loading: true,
      loadDelay: 0,
      error: false,
      errorMessage: '',
      profileData: { },
      projectsData: { }
    }
  }

  componentWillMount () {
    // ensure all CDN libs are defined
    if(typeof $ === 'undefined' || typeof Materialize === 'undefined' || typeof Prism === 'undefined') {
      throw new Error('CODEFOLIO ERROR: CDN lib undefined')
    }
  }

  componentDidMount () {
    // if dev environment mimic server response time
    this.state.loadDelay = ExternalConfig.ENV === 'development' ? 1700 : 500
    // fetch api data
    this.timer = setTimeout(() => {
      Api.FetchData()
          .then(apiData => {
            this.handleResponse(apiData)
          })
          .catch(reason => {
            this.handleError(reason)
          })
      // clear timer
      clearTimeout(this.timer)
      this.timer = null
    }, this.state.loadDelay)
  }

  /**
   * Handle api server response
   * @param apiData : object
   * @returns {}
   */
  handleResponse (apiData) {
    if(!apiData.profile.success) {
      this.setState({
        loading: false,
        error: true,
        errorMessage: 'API error fetching profile: ' + apiData.profile.message
      })
    } else if(!apiData.projects.success) {
      this.setState({
        loading: false,
        error: true,
        errorMessage: 'API error fetching projects: ' + apiData.projects.message
      })
    } else {
      // success - update app state
      this.setState({
        loading: false,
        profileData: apiData.profile.data,
        projectsData: apiData.projects
      })
      // then init layout
      this.initialiseLayout(apiData.profile.data.layout)
    }
  }

  /**
   * Handle api server error
   * @param reason : object
   * @returns {}
   */
  handleError (reason) {
    this.setState({
      loading: false,
      error: true,
      errorMessage: reason.message
    })
  }

  /**
   * Method to set theme & bg image
   * & any dom manipulation
   * @param layout : object
   * @returns {}
   */
  initialiseLayout (layout) {
    // set body classes
    let classes = []
    classes.push('cf-theme-' + layout.theme)
    classes.push('background-image-' + String(layout.displayBgImage))
    for (let value of classes) {
      document.body.classList.add(value)
    }
    // initialise Materialize mobile menu widget
    $('#cf-button-collapse').sideNav({ closeOnClick: true })
  }

  render () {
    if(this.state.loading) {
      return (
        <div styleName="cf-container" className="container">
          <div className="row">
            <div className="col s12" styleName="cf-main">
              <div styleName="loading-panel"><Loader /></div>
            </div>
          </div>
        </div>
      )
    } else if(this.state.error) {
      return (
        <div styleName="error-panel" className="card-panel">Error: {this.state.errorMessage}</div>
      )
    } else {
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
                    <ProjectsList data={this.state.projectsData.data} />
                  </div>
                </div>
                <div styleName="cf-content" className="col s12 l9 no-padding">
                  { this.props.children && React.cloneElement(this.props.children, { profileData: this.state.profileData, projectsData: this.state.projectsData }) }
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

}

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default CssModules(App, styles)
