/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/* eslint no-else-return: "off" */
import React, { Component } from 'react'
import CssModules from 'react-css-modules'
import Avatar from '../../components/Avatar/Avatar'
import IconLinks from '../../components/IconLinks/IconLinks'
import TechIcons from '../../components/TechIcons/TechIcons'
import styles from './Profile.css'

/**
 * @class Profile
 * @extends React.Component
 */
class Profile extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      profileData: { }
    }
  }

  componentDidMount () {
    this.timer = setTimeout(() => {
      this.setState({
        loading: false,
        profileData: {
          profileName: 'Steven Wozniak',
          profileDescription: 'Objective C developer',
          techIcons: [
            {name: 'Rails', icon: 'rails-plain'},
            {name: 'Javascript', icon: 'javascript-plain'},
            {name: 'Git', icon: 'git-plain'},
            {name: 'Bootstrap', icon: 'bootstrap-plain'},
            {name: 'Symfony', icon: 'symfony-original'},
            {name: 'PHP', icon: 'php-plain'},
            {name: 'Nodejs', icon: 'nodejs-plain'}
          ],
          profileContacts: [
            {name: '@swozniak_apple', url: 'http://twitter.com/swozniak_apple'},
            {name: '@my_gitter_handle', url: 'http://gitter.im/my_gitter_handle'},
            {name: 'swozniak@email.com', url: 'mailto:swozniak@email.com'}
          ],
          profileLocation: [
            {name: 'Silicon Valley, California', url: 'https://goo.gl/maps/yA6gDxKgoTU2'}
          ],
          profileLinks: [
            {name: 'github.com/swoz', url: 'http://github.com/swoz'},
            {name: 'blogger.woz-blog.com', url: 'http://blogger.woz-blog.com'}
          ],
          bioHtml: `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`
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
   * Get html formatted bio
   * @param html : string
   * @returns {object}
   */
  getBioHTML (html) {
    // TODO: alt way of formatting html string
    return {__html: html }
  }

  render () {
    if(this.state.loading) {
      return (
        <div styleName="cf-progress" className="progress">
          <div className="indeterminate"></div>
        </div>
      )
    } else {
      return (
        <div styleName="cf-profile">
          <Avatar />
          <h1 styleName="profile-name">{this.state.profileData.profileName}</h1>
          <span styleName="profile-description">{this.state.profileData.profileDescription}</span>
          <TechIcons data={this.state.profileData.techIcons} />
          <IconLinks icon="perm_contact_calendar" data={this.state.profileData.profileContacts} />
          <IconLinks icon="location_on" data={this.state.profileData.profileLocation} />
          <IconLinks icon="link" data={this.state.profileData.profileLinks} />
          <div styleName="cf-bio" dangerouslySetInnerHTML={this.getBioHTML(this.state.profileData.bioHtml)}></div>
        </div>
      )
    }
  }

}

Profile.propTypes = {}
Profile.defaultProps = {}

export default CssModules(Profile, styles)
