/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './IconLinks.css'

/**
 * @class IconLinks
 * @extends Component
 */
class IconLinks extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    if(this.props.data.length === 0) {
      return (<div className="hide"></div>)
    } else {
      let links = this.props.data.map((obj, index) => {
        return (<a key={index} target="_blank" href={obj.url}>{obj.name}</a>)
      })
      return (
        <div styleName="cf-iconlinks">
          <i className="material-icons left cf-icon-left">{this.props.icon}</i>
          <span styleName="iconlinks-group">{links}</span>
        </div>
      )
    }
  }

}

IconLinks.propTypes = {
  data: PropTypes.array,
  icon: PropTypes.string
}

export default CssModules(IconLinks, styles)
