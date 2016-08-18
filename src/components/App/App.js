/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import * as actionCreators from '../../actions'
import ProjectsList from '../../containers/ProjectsList'
import styles from './App.css'

/**
 * @class App
 * @extends {Component}
 */
class App extends Component {

  componentWillMount () {
    // ensure all CDN libs are defined
    if(typeof $ === 'undefined' || typeof Materialize === 'undefined') {
      throw new Error('CODEFOLIO ERROR: CDN lib undefined')
    }
  }

  componentDidMount () {
    // initialise Materialize mobile menu widget
    $('#cf-button-collapse').sideNav({ closeOnClick: true })
    // we load profile here so the app will always have user layout prefs
    if(!this.props.profile.hasLoaded) {
      this.props.fetchProfileAsync()
    }
  }

  componentDidUpdate () {
    if(this.props.profile.hasLoaded && !this.props.profile.error) {
      this.initialiseLayout(this.props.profile.data.layout)
    }
  }

  /**
   * Method to set theme & bg image
   * & any dom manipulation
   * @param {object} layout
   */
  initialiseLayout (layout) {
    // set body classes
    let classes = []
    classes.push('cf-theme-' + layout.theme)
    classes.push('background-image-' + String(layout.displayBgImage))
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
                  <ProjectsList />
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
  children: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  fetchProfileAsync: PropTypes.func.isRequired
}

const mapStateToProps = ({profile}) => ({profile})

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

App = connect(mapStateToProps, mapDispachToProps)(CssModules(App, styles))
export default App
