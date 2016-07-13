import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './ResetForm.css'

/**
 * @class ResetForm
 * @extends Component
 */
class ResetForm extends Component {

  render () {
    return (
      <div>
        <h4>ResetForm component</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
      </div>
    )
  }
}

ResetForm.propTypes = {
  auth: PropTypes.object.isRequired
}

export default CssModules(ResetForm, styles)
