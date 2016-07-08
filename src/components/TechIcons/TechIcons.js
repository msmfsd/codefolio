/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './TechIcons.css'

/**
 * @class TechIcons
 * @extends Component
 */
class TechIcons extends Component {

  render () {
    if(!this.props.data) {
      return (<div></div>)
    } else {
      let techicons = this.props.data.map((obj, index) => {
        return (<i key={index} title={obj.name} className={this.props.devIconPrefix + obj.icon}></i>)
      })
      return (<div styleName="cf-techicons">{techicons}</div>)
    }
  }

}

TechIcons.propTypes = {
  data: PropTypes.array,
  devIconPrefix: PropTypes.string
}

TechIcons.defaultProps = {
  devIconPrefix: 'devicon-'
}

export default CssModules(TechIcons, styles)
