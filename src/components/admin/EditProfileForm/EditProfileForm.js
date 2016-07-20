/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import CssModules from 'react-css-modules'
import AdminNav from '../AdminNav/AdminNav'
import { createValidator, required, maxLength } from '../../../utils/validate'
import styles from './EditProfileForm.css'

// client validation
const editProfileValidation = createValidator({
  name: [required, maxLength(36)],
  description: [required, maxLength(72)],
  bio: [required]
})

/**
 * @class EditProfileForm
 * @extends Component
 */
class EditProfileForm extends Component {

  componentDidMount () {
    // ensure API data and redux store sync
    // by always refreshing data on mount
    if(!this.props.profile.loading) {
      this.props.fetchProfileAsync()
    }
  }

  render () {
    const { profile, editProfile, auth, logoutAsync, editProfileAsync, fields: { name, description, bio }, handleSubmit } = this.props
    return (
      <div>
        <AdminNav onClick={() => logoutAsync(auth.token)} auth={auth} showBackBtn={true} />
        <div styleName="form-container">
          <div className="row">
            <div styleName="card-padding" className={editProfile.editProfileSuccess ? 'card-panel show' : 'card-panel hide'}>
              <span>Profile updated successfully: <a href="/profile" target="_blank">View profile</a></span>
            </div>
          </div>
          <div className="row">
            <div className={profile.loading || profile.error ? 'col s12 show' : 'col s12 hide'}>
              {profile.error ? 'Profile fetch error' : <div styleName="cf-progress"><div className="progress"><div className="indeterminate"></div></div></div>}
            </div>
            <form className={profile.loading && !profile.error ? 'hide' : 'show'} onSubmit={handleSubmit(data => editProfileAsync(data, auth.token))}>
              <div className="col s12">
                <h3>Edit profile</h3>
                <p>Edit your public profile fields.</p>
              </div>
              <div className="input-field col s12">
                <h6>Name:</h6>
                <input type="text" placeholder="Full name" {...name}/>
                {name.touched && name.error && <div>{name.error}</div>}
              </div>
              <div className="input-field col s12">
                <h6>Description:</h6>
                <input type="text" placeholder="Quick description" {...description}/>
                {description.touched && description.error && <div>{description.error}</div>}
              </div>
              <div className="input-field col s12">
                <h6>Bio:</h6>
                <textarea rows="8" placeholder="Full biography" {...bio}/>
                {bio.touched && bio.error && <div>{bio.error}</div>}
              </div>
              <div styleName="form-messages" className="col s12">{editProfile.editProfileError && editProfile.editProfileErrMessage}</div>
              <div className="input-field col s12">
                <button styleName="form-btn" className={editProfile.editProfileLoading ? 'waves-effect btn btn-loading' : 'waves-effect btn'} type="submit" disabled={editProfile.editProfileLoading}><i className="material-icons">settings</i><span>Update</span></button>
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
  logoutAsync: PropTypes.func.isRequired,
  editProfile: PropTypes.object.isRequired,
  editProfileAsync: PropTypes.func,
  fetchProfileAsync: PropTypes.func,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'editprofile',
  fields: [ 'name', 'description', 'bio' ],
  validate: editProfileValidation
}, state => ({
  initialValues: state.profile.data
}))(CssModules(EditProfileForm, styles))
