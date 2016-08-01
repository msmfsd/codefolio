/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/* eslint react/prop-types: "off" */
import React, { Component, PropTypes } from 'react'
import Markdown from 'react-markdown'
import CssModules from 'react-css-modules'
import Loader from '../../components/Loader/Loader'
import Panel from '../../components/Panel/Panel'
import Avatar from '../../components/Avatar/Avatar'
import IconLinks from '../../components/IconLinks/IconLinks'
import TechIcons from '../../components/TechIcons/TechIcons'
import styles from './ProfileViewer.css'

/**
 * @class ProfileViewer
 * @extends React.Component
 */
class ProfileViewer extends Component {

  render () {
    // map data
    const { profile } = this.props
    // async render states
    if(profile.loading || (!profile.hasLoaded && !profile.error)) {
      return (<div><Loader /></div>)
    } else if(profile.error) {
      return (<div><Panel message={'Error: ' + profile.errMessage} /></div>)
    } else {
      return (
        <div styleName="cf-profile">
          <Avatar data={profile.data.avatar} />
          <h1 styleName="profile-name">{profile.data.name}</h1>
          <span styleName="profile-description">{profile.data.description}</span>
          <TechIcons data={profile.data.techIcons} />
          <IconLinks icon="perm_contact_calendar" data={profile.data.contacts} />
          <IconLinks icon="location_on" data={profile.data.location} />
          <IconLinks icon="link" data={profile.data.links} />
          <div styleName="cf-bio">
            <Markdown source={profile.data.bio} />
          </div>
        </div>
      )
    }
  }

}

ProfileViewer.propTypes = {
  profile: PropTypes.object.isRequired
}

export default CssModules(ProfileViewer, styles)
