/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { devicons } from '../../../utils/devicons'
import CssModules from 'react-css-modules'
import styles from './FormTechIconsEditor.css'

/**
 * @class FormTechIconsEditor
 * @extends Component
 */
class FormTechIconsEditor extends Component {

  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      message: null
    }
  }

  /**
   * Create new empty link fields
   * @param e : dom node event object
   */
  createItem (e) {
    e.preventDefault()
    this.setState(
      {
        editing: true,
        message: null
      }
    )
  }

  /**
   * Add new link to store/form
   * @param e : dom node event object
   */
  addItem (e) {
    e.preventDefault()
    const text = this.refs.selectIcon.options[this.refs.selectIcon.selectedIndex].text
    const name = text[0].toUpperCase() + text.slice(1)
    const icon = this.refs.selectIcon.value
    let duplicate = false
    // already added?
    for(let obj of this.props.fields.value) {
      if(obj.icon === icon) {
        duplicate = true
        break
      }
    }
    if(duplicate) {
      this.setState({ message: 'Icon already added' })
    } else {
      // ok
      this.setState({ editing: false, message: null })
      this.props.addLinkFunc(this.props.linkGroup, name, icon)
    }
  }

  /**
   * Remove new link from store/form
   * @param index : number
   * @param e : dom node event object
   */
  removeItem (index, e) {
    e.preventDefault()
    this.props.removeLinkFunc(this.props.linkGroup, index)
  }

  /**
   * Cancel create new link
   * @param e : dom node event object
   */
  cancelItem (e) {
    e.preventDefault()
    this.setState(
      {
        editing: false,
        message: null
      }
    )
  }

  render () {
    const { fields, max } = this.props
    let techicons = null
    let maxReached = false
    let deviconOptions = devicons.map((obj, index) => {
      return (
        <option key={index} value={obj.name + '-' + obj.versions.font[0]}>{obj.name}</option>
      )
    })
    if(fields.value) {
      if(fields.value.length >= max) {
        maxReached = true
      }
      techicons = fields.value.map((obj, index) => {
        let boundClick = this.removeItem.bind(this, index)
        return (
          <tr key={index}>
            <td>{obj.name}</td>
            <td><i title={obj.name} className={this.props.devIconPrefix + obj.icon}></i></td>
            <td><button data-index={index} onClick={boundClick} className="btn-floating btn-small waves-effect right"><i className="material-icons">delete</i></button></td>
          </tr>
        )
      })
    }

    return (
      <table styleName="form-techicons-editor" className="highlight bordered">
        <thead>
          <tr>
            <th data-field="name">Technology name</th>
            <th data-field="icon">Icon</th>
            <th styleName="minwidth-th" data-field="action">
              <button disabled={this.state.editing || maxReached} onClick={this.createItem.bind(this)} className="btn-floating btn-small waves-effect right"><i className="material-icons">add_circle</i></button>
            </th>
          </tr>
        </thead>
        <tbody>
          {techicons}
          <tr>
            <td>
              <select ref="selectIcon" className="browser-default">
                {deviconOptions}
              </select>
            </td>
            <td>&nbsp;</td>
            <td>
              <button onClick={this.addItem.bind(this)} className="btn-floating btn-small waves-effect right"><i className="material-icons">check_circle</i></button>
            </td>
          </tr>
          <tr className={this.state.message ? 'show' : 'hide'}>
            <td colSpan="3"><div className="input-field-message">{this.state.message}</div></td>
          </tr>
        </tbody>
      </table>
    )
  }

}

FormTechIconsEditor.propTypes = {
  fields: PropTypes.object.isRequired,
  linkGroup: PropTypes.string.isRequired,
  addLinkFunc: PropTypes.func.isRequired,
  removeLinkFunc: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired,
  devIconPrefix: PropTypes.string.isRequired
}

FormTechIconsEditor.defaultProps = {
  devIconPrefix: 'devicon-'
}

export default CssModules(FormTechIconsEditor, styles)
