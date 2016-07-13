import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import styles from './EditProfileForm.css'

/**
 * @class EditProfileForm
 * @extends Component
 */
class EditProfileForm extends Component {

  render () {
    return (
      <div>
        <h4>EditProfileForm component</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
        <Link to={'/admin'}>Back to Admin Dashboard</Link>
      </div>
    )
  }
}

EditProfileForm.propTypes = {
  state: PropTypes.object.isRequired
}

export default CssModules(EditProfileForm, styles)
