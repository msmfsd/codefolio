/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import styles from './IconTechChips.css'

/**
 * @class IconTechChips
 * @extends Component
 */
class IconTechChips extends Component {

  constructor (props) {
    super(props)
    this.state = { }
  }

  render () {
    let links = this.props.data.map((obj, index) => {
      return (<div key={index} styleName="cf-chip" className="chip">{obj}</div>)
    })
    return (
      <div styleName="cf-icon-tech-chips">
        <i className="material-icons left">{this.props.icon}</i>
        <span styleName="icon-tech-chips-group">{links}</span>
      </div>
    )
  }

}

IconTechChips.propTypes = {
  data: PropTypes.array,
  icon: PropTypes.string
}

export default CssModules(IconTechChips, styles)
