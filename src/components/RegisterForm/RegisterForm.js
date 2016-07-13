import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './RegisterForm.css'

/**
 * @class RegisterForm
 * @extends Component
 */
class RegisterForm extends Component {

  render () {
    return (
      <div>
        <h4>RegisterForm component</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
      </div>
    )
  }
}

RegisterForm.propTypes = {
  auth: PropTypes.object.isRequired
}

export default CssModules(RegisterForm, styles)
