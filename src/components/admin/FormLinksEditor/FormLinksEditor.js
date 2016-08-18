/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import CssModules from 'react-css-modules'
import styles from './FormLinksEditor.css'

/**
 * @class FormLinksEditor
 * @extends {Component}
 */
class FormLinksEditor extends Component {

  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      nameFieldValue: null,
      urlFieldValue: null,
      message: null
    }
  }

  /**
   * Create new empty link fields
   * @param {object} e - event object
   */
  createItem (e) {
    e.preventDefault()
    this.refs.createItemName.value = ''
    this.refs.createItemUrl.value = ''
    this.setState(
      {
        editing: true,
        nameFieldValue: '',
        urlFieldValue: '',
        message: null
      }
    )
  }

  /**
   * Add new link to store/form
   * @param {object} e - event object
   */
  addItem (e) {
    e.preventDefault()
    if(this.refs.createItemName.value !== '' && this.refs.createItemUrl.value !== '') {
      this.setState({ editing: false, message: null })
      this.props.addLinkFunc(this.props.linkGroup, this.state.nameFieldValue, this.state.urlFieldValue)
      this.refs.createItemName.value = ''
      this.refs.createItemUrl.value = ''
      ReactDOM.findDOMNode(this.refs.createItemName).focus()
    } else {
      this.setState({ message: 'Both fields required' })
    }
  }

  /**
   * Remove new link from store/form
   * @param {number} index
   * @param {object} e - event object
   */
  removeItem (index, e) {
    e.preventDefault()
    this.props.removeLinkFunc(this.props.linkGroup, index)
    this.setState(
      {
        editing: false,
        nameFieldValue: '',
        urlFieldValue: '',
        message: null
      }
    )
    ReactDOM.findDOMNode(this.refs.createItemName).focus()
  }

  /**
   * Cancel create new link
   * @param {object} e - event object
   */
  cancelItem (e) {
    e.preventDefault()
    this.setState(
      {
        editing: false,
        nameFieldValue: '',
        urlFieldValue: '',
        message: null
      }
    )
  }

  render () {
    const { fields, max } = this.props
    let links = null
    let maxReached = false
    if(fields.value) {
      if(fields.value.length >= max) {
        maxReached = true
      }
      links = fields.value.map((obj, index) => {
        let boundClick = this.removeItem.bind(this, index)
        return (
          <tr key={index}>
            <td>{obj.name}</td>
            <td>{obj.url}</td>
            <td><button data-index={index} onClick={boundClick} className="btn-floating btn-small waves-effect right"><i className="material-icons">delete</i></button></td>
          </tr>
        )
      })
    }

    return (
      <table styleName="form-links-editor" className="highlight bordered">
        <thead>
          <tr>
            <th data-field="name">Display name</th>
            <th data-field="url">Full URL</th>
            <th styleName="minwidth-th" data-field="action">
              <button disabled={this.state.editing || maxReached} onClick={this.createItem.bind(this)} className="btn-floating btn-small waves-effect right"><i className="material-icons">add_circle</i></button>
            </th>
          </tr>
        </thead>
        <tbody>
          {links}
          <tr className={maxReached ? 'hide' : 'show'}>
            <td>
              <input onChange={(e) => {
                this.state.nameFieldValue = e.target.value
              }} ref="createItemName" type="text" placeholder="Link display name" />
            </td>
            <td>
              <input onChange={(e) => {
                this.state.urlFieldValue = e.target.value
              }} ref="createItemUrl" type="text" placeholder="Full url" />
            </td>
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

FormLinksEditor.propTypes = {
  fields: PropTypes.object.isRequired,
  linkGroup: PropTypes.string.isRequired,
  addLinkFunc: PropTypes.func.isRequired,
  removeLinkFunc: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired
}

FormLinksEditor = CssModules(FormLinksEditor, styles)
export default FormLinksEditor
