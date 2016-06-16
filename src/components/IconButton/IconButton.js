/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import Button from '../Button/Button'
import styles from './IconButton.css'

/**
 * @class IconButton
 * @extends Component
 */
class IconButton extends Component {

  render () {
    const {children} = this.props

    return (
      <Button {...this.props} className={'btn waves-effect waves-light'} styleName={'button'}>
        <i className="icon"></i>
        {children}
      </Button>
    )
  }

}

IconButton.propTypes = {
  children: PropTypes.string.isRequired
}

export default CssModules(IconButton, styles)
