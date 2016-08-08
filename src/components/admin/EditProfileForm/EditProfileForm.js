/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import CssModules from 'react-css-modules'
import Avatar from '../../Avatar/Avatar'
import AvatarEditor from '../AvatarEditor/AvatarEditor'
import FormLinksEditor from '../FormLinksEditor/FormLinksEditor'
import FormTechIconsEditor from '../FormTechIconsEditor/FormTechIconsEditor'
import { createValidator, required, maxLength, ifAvatarGravitar, ifAvatarCustom } from '../../../utils/validate'
import styles from './EditProfileForm.css'

// fields & client validation
const fields = [
  'name',
  'description',
  'bio',
  'theme',
  'displayBgImage',
  'use',
  'gravitarEmail',
  'customAvatar',
  'customAvatarFile',
  'techIcons',
  'links',
  'contacts',
  'location'
]
const editProfileValidation = createValidator({
  name: [required, maxLength(36)],
  description: [required, maxLength(72)],
  bio: [required],
  displayBgImage: [required],
  use: [required],
  gravitarEmail: [ifAvatarGravitar('use', 'gravitarEmail')],
  customAvatarFile: [ifAvatarCustom('use', 'customAvatar')]
})

/**
 * @class EditProfileForm
 * @extends Component
 */
class EditProfileForm extends Component {

  componentWillMount () {
    // reset edit profile props
    this.props.editProfileReset()
  }

  componentDidMount () {
    // ensure API data and redux store sync
    // by always refreshing data on mount
    if(!this.props.profile.loading) {
      this.props.fetchProfileAsync()
    }
  }

  componentDidUpdate () {
    // scroll to first validation error
    if(this.props.submitFailed) {
      let div = document.getElementsByClassName('input-field-message')[0].offsetParent
      if(div) {
        window.scrollTo(0, div.offsetTop + 60)
      }
    }
  }

  /**
   * Allow live form edits to update profile state on blur
   * Why? So other state updates dont reset their values pre submit
   * @param e : object
   */
  onBlurUpdate (e) {
    if(e.currentTarget.name === 'theme' || e.currentTarget.name === 'displayBgImage') {
      this.props.updateLayoutField(e.currentTarget.name, e.currentTarget.value)
    } else {
      this.props.updateProfileField(e.currentTarget.name, e.currentTarget.value)
    }
  }

  render () {
    const {
      profile,
      auth,
      editProfileAsync,
      addProfileTechicon,
      addProfileLink,
      removeProfileItem,
      updateAvatarFields,
      handleSubmit,
      defaultInputClasses,
      fields: {
        name,
        description,
        bio,
        displayBgImage,
        use,
        gravitarEmail,
        customAvatar,
        customAvatarFile,
        techIcons,
        links,
        contacts,
        location
      }
    } = this.props

    return (
      <div>
        <div styleName="form-container">
          <div className="row">
            <div styleName="card-padding" className={profile.editProfileSuccess ? 'card-panel show' : 'card-panel hide'}>
              <span>Profile updated successfully: <a href="/profile" target="_blank">View profile</a></span>
            </div>
          </div>
          <div className="row">
            <div className={profile.loading || profile.error ? 'col s12 show' : 'col s12 hide'}>
              {profile.error ? <div styleName="card-padding" className="card-panel">Profile failed to fetch. API server unreachable.</div> : <div styleName="cf-progress"><div className="progress"><div className="indeterminate"></div></div></div>}
            </div>
            <form className={profile.loading || profile.error ? 'hide' : 'show'} onSubmit={handleSubmit(data => editProfileAsync(data, auth.token))}>
              <div className="col s12">
                <h3>Edit profile</h3>
                <p>Your public profile appears on the main page of your folio.</p>
              </div>
              <div className={defaultInputClasses}><h5>Avatar</h5></div>
              <div styleName="admin-avatar-display" className={defaultInputClasses}>
                <Avatar data={profile.data.avatar} />
              </div>
              <AvatarEditor use={use} gravitarEmail={gravitarEmail} customAvatar={customAvatar} customAvatarFile={customAvatarFile} updateAvatarFields={updateAvatarFields} />
              <div className={defaultInputClasses}><h5>Personal</h5></div>
              <div className={defaultInputClasses}>
                <h6>Name:<div className="hint">eg. Linus Torvalds</div></h6>
                <input type="text" placeholder="Enter your full name" {...name} onBlur={(e) => this.onBlurUpdate(e)}/>
                {name.touched && name.error && <div className="input-field-message">{name.error}</div>}
              </div>
              <div className={defaultInputClasses}>
                <h6>Description:<div className="hint">eg. C++, FORTRAN developer and creator of Linux</div></h6>
                <input type="text" placeholder="Enter a description" {...description} onBlur={(e) => this.onBlurUpdate(e)}/>
                {description.touched && description.error && <div className="input-field-message">{description.error}</div>}
              </div>
              <div className={defaultInputClasses}>
                <h6>Biography:<div className="hint">Use <a style={{textDecoration: 'underline'}} href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Markdown</a> or plain text</div></h6>
                <textarea rows="8" placeholder="Enter your bio" {...bio} onBlur={(e) => this.onBlurUpdate(e)}/>
                {bio.touched && bio.error && <div className="input-field-message">{bio.error}</div>}
              </div>
              <div className={defaultInputClasses}><h5>Tech icons</h5></div>
              <div styleName="table-div" className={defaultInputClasses}>
                <h6>Set your fave technologies:</h6>
                <FormTechIconsEditor fields={techIcons} linkGroup={'techIcons'} addLinkFunc={addProfileTechicon} removeLinkFunc={removeProfileItem} max={20} />
              </div>
              <div className={defaultInputClasses}><h5>Contacts</h5></div>
              <div styleName="table-div" className={defaultInputClasses}>
                <h6>Add up to 4 contact links:<div className="hint">eg. @my_gitter_handle &#126; http://gitter.im/my_gitter_handle</div></h6>
                <FormLinksEditor fields={contacts} linkGroup={'contacts'} addLinkFunc={addProfileLink} removeLinkFunc={removeProfileItem} max={4} />
              </div>
              <div className={defaultInputClasses}><h5>Location</h5></div>
              <div styleName="table-div" className={defaultInputClasses}>
                <h6>Add up to 2 location links:<div className="hint">eg. Helsinki &#126; https://goo.gl/maps/Helsinki</div></h6>
                <FormLinksEditor fields={location} linkGroup={'location'} addLinkFunc={addProfileLink} removeLinkFunc={removeProfileItem} max={2} />
              </div>
              <div className={defaultInputClasses}><h5>Web links</h5></div>
              <div styleName="table-div" className={defaultInputClasses}>
                <h6>Add up to 4 web links:<div className="hint">eg. github/torvalds &#126; https://github.com/torvalds</div></h6>
                <FormLinksEditor fields={links} linkGroup={'links'} addLinkFunc={addProfileLink} removeLinkFunc={removeProfileItem} max={4} />
              </div>
              <div className={defaultInputClasses}><h5>Folio layout</h5></div>
              <div className={defaultInputClasses}>
                <h6>Display background image:<div className="hint">Show body background image on large screens?</div></h6>
                <input type="radio" {...displayBgImage} value="yes" checked={displayBgImage.value === 'yes'} onBlur={(e) => this.onBlurUpdate(e)}/>&nbsp;Yes
                <input type="radio" {...displayBgImage} value="no" checked={displayBgImage.value === 'no'} onBlur={(e) => this.onBlurUpdate(e)}/>&nbsp;No
              </div>
              <div className={defaultInputClasses}><h5>Save profile updates</h5></div>
              <div styleName="form-messages" className="col s12">{profile.editProfileError && profile.editProfileErrMessage}</div>
              <div className={defaultInputClasses}>
                <button styleName="form-btn" className={profile.editProfileLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} type="submit" disabled={profile.editProfileLoading}><i className="material-icons">settings</i><span>Submit updates</span></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

EditProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  editProfileAsync: PropTypes.func,
  editProfileReset: PropTypes.func,
  fetchProfileAsync: PropTypes.func,
  addProfileTechicon: PropTypes.func,
  addProfileLink: PropTypes.func,
  removeProfileItem: PropTypes.func,
  updateProfileField: PropTypes.func.isRequired,
  updateAvatarFields: PropTypes.func.isRequired,
  updateLayoutField: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  submitFailed: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  defaultInputClasses: PropTypes.string
}

EditProfileForm.defaultProps = {
  defaultInputClasses: 'input-field col s12'
}

export default reduxForm({
  form: 'editprofile',
  fields,
  validate: editProfileValidation
}, state => ({
  initialValues: Object.assign({}, state.profile.data, state.profile.data.layout, state.profile.data.avatar, state.profile.techIcons, state.profile.links, state.profile.contacts, state.profile.location)
}))(CssModules(EditProfileForm, styles))
