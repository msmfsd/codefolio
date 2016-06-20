/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/* eslint no-else-return: "off" */
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
   * Get html formatted
   * @param html : string
   * @returns {object}
   */
  getSanitisedHtml (html) {
    // TODO: alt way of formatting html string
    return {__html: html }
  }

  render () {
    return (
      <div styleName="cf-profile">
        <Avatar data={this.props.profileData.avatar} />
        <h1 styleName="profile-name">{this.props.profileData.name}</h1>
        <span styleName="profile-description">{this.props.profileData.description}</span>
        <TechIcons data={this.props.profileData.techIcons} />
        <IconLinks icon="perm_contact_calendar" data={this.props.profileData.contacts} />
        <IconLinks icon="location_on" data={this.props.profileData.location} />
        <IconLinks icon="link" data={this.props.profileData.links} />
        <div styleName="cf-bio" dangerouslySetInnerHTML={this.getSanitisedHtml(this.props.profileData.bio)}></div>
      </div>
    )
  }

}

Profile.propTypes = {
  profileData: PropTypes.object
}

export default CssModules(Profile, styles)
