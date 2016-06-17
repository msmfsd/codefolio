/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/* eslint no-else-return: "off" */
import React, { Component } from 'react'
import CssModules from 'react-css-modules'
import ExternalConfig from 'ExternalConfig'
import Avatar from '../../components/Avatar/Avatar'
import IconLinks from '../../components/IconLinks/IconLinks'
import TechIcons from '../../components/TechIcons/TechIcons'
import Loader from '../../components/Loader/Loader'
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

  componentWillMount () {


    // TODO ***** use async await here


    this.runPolling()
  }

  setData () {
    console.log('yeah')
    // set data
    this.setState({
      loading: false,
      profileData: {
        profileName: d.data.name,
        profileDescription: d.data.description,
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
        bioHtml: d.data.bio
      }
    })
  }

  *pollForProfileData(){
    while(true){
      yield fetch(ExternalConfig.API_URL + '/api/profile?apikey=' + ExternalConfig.API_KEY,{
        method: 'get'
      }).then(function(d){
        var json = d.json()
        return json
      })
    }
  }

  runPolling(generator){
    if(!generator){
      generator = this.pollForProfileData()
    }

    var p = generator.next();
    p.value.then(function(d){
      if(!d.success){
        this.runPolling(generator)
      } else {
        console.log('success: ' + d.success)
        if(d.success === false) {
          // TODO
          throw new Error('API error: ' + d.message)
        } else {
          // TODO avatar, layout-theme/bg etc.
          // TODO api schema
          this.setData()
        }
      }
    })
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
        <div styleName="cf-profile">
          <Avatar />
          <h1 styleName="profile-name">{this.state.profileData.profileName}</h1>
          <span styleName="profile-description">{this.state.profileData.profileDescription}</span>
          <TechIcons data={this.state.profileData.techIcons} />
          <IconLinks icon="perm_contact_calendar" data={this.state.profileData.profileContacts} />
          <IconLinks icon="location_on" data={this.state.profileData.profileLocation} />
          <IconLinks icon="link" data={this.state.profileData.profileLinks} />
          <div styleName="cf-bio" dangerouslySetInnerHTML={this.getSanitisedHtml(this.state.profileData.bioHtml)}></div>
        </div>
      )
    }
  }

}

Profile.propTypes = {}
Profile.defaultProps = {}

export default CssModules(Profile, styles)
