/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './ForgotForm.css'

/**
 * @class ForgotForm
 * @extends Component
 */
class ForgotForm extends Component {

  render () {
    return (
      <div>
        <h4>ForgotForm component</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
      </div>
    )
  }
}

ForgotForm.propTypes = {
  auth: PropTypes.object.isRequired
}

export default CssModules(ForgotForm, styles)
