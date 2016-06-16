/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './Button.css'

/**
 * @class Button
 * @extends Component
 */
class Button extends Component {
  render () {
    const {children} = this.props

    return (<button {...this.props} className={'btn waves-effect waves-light'} styleName={'button'}>{children}</button>)
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired
}

export default CssModules(Button, styles)
