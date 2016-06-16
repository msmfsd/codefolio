/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
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
  }

  /**
   * Get icon link data
   * @param group : String
   * @returns {Array}
   */
  getIconLinks (group) {
    let arr = null
    switch (group) {
    case 'contacts':
      arr = this.props.profileContacts
      break;
    case 'location':
      arr = this.props.profileLocation
      break;
    case 'links':
      arr = this.props.profileLinks
      break;
    default:
      arr = []
    }
    return arr;
  }

  /**
   * Get tech icons
   * @returns {Array}
   */
  getTechIcons () {
    let arr = [
      {name: 'Rails', icon: 'rails-plain'},
      {name: 'Javascript', icon: 'javascript-plain'},
      {name: 'Git', icon: 'git-plain'},
      {name: 'Bootstrap', icon: 'bootstrap-plain'},
      {name: 'Symfony', icon: 'symfony-original'},
      {name: 'PHP', icon: 'php-plain'},
      {name: 'Nodejs', icon: 'nodejs-plain'}
    ]
    return arr;
  }

  /**
   * Get html formatted bio
   * @returns {Object}
   */
  getBioHTML () {
    // TODO: alt way of formatting html string
    return {__html: this.props.bio }
  }

  render () {
    return (
      <div styleName="cf-profile">
        <Avatar />
        <h1 styleName="profile-name">Steven Wozniak</h1>
        <span styleName="profile-description">Objective C developer</span>
        <TechIcons data={this.getTechIcons()} />
        <IconLinks icon="perm_contact_calendar" data={this.getIconLinks('contacts')} />
        <IconLinks icon="location_on" data={this.getIconLinks('location')} />
        <IconLinks icon="link" data={this.getIconLinks('links')} />
        <div styleName="cf-bio" dangerouslySetInnerHTML={this.getBioHTML()}></div>
      </div>
    )
  }

}

Profile.propTypes = {
  profileContacts: PropTypes.array,
  profileLocation: PropTypes.array,
  profileLinks: PropTypes.array,
  bio: PropTypes.string
}
Profile.defaultProps = {
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
  bio: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>'
}

export default CssModules(Profile, styles)
