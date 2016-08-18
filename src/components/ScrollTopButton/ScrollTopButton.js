/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './ScrollTopButton.css'

/**
 * @class ScrollTopButton
 * @extends {Component}
 */
class ScrollTopButton extends Component {

  constructor (props) {
    super(props)
    this.scrollToTop = this.scrollToTop.bind(this)
  }

  componentWillUpdate () {
    if(this.scrollTopTimer !== null) {
      clearInterval(this.scrollTopTimer)
      this.scrollTopTimer = null
    }
  }

  componentWillUnmount () {
    if(this.scrollTopTimer !== null) {
      clearInterval(this.scrollTopTimer)
      this.scrollTopTimer = null
    }
  }

  /**
   * Back to top btn click
   * @param {object} e - event object
   */
  scrollToTop (e) {
    e.preventDefault()
    const doc = document.documentElement
    let top = null
    this.scrollTopTimer = setInterval(() => {
      top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      if (top > 0) {
        window.scrollTo(0, top - 30)
      } else {
        clearInterval(this.scrollTopTimer)
        this.scrollTopTimer = null
      }
    }, this.props.scrollSpeed)
  }

  render () {
    return (
      <a onClick={(e) => this.scrollToTop(e)} styleName="projects-back-to-top" className="btn"><i className="material-icons left">arrow_upward</i>Top</a>
    )
  }

}

ScrollTopButton.propTypes = {
  scrollSpeed: PropTypes.number
}

ScrollTopButton.defaultProps = {
  scrollSpeed: 10
}

ScrollTopButton = CssModules(ScrollTopButton, styles)
export default ScrollTopButton
