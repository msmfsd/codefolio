/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import CssModules from 'react-css-modules'
import styles from './FormArrayEditor.css'

/**
 * @class FormArrayEditor
 * @extends {Component}
 */
class FormArrayEditor extends Component {

  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      nameFieldValue: null,
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
    this.setState(
      {
        editing: true,
        nameFieldValue: '',
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
    if(this.refs.createItemName.value !== '') {
      this.setState({ editing: false, message: null })
      this.props.addItemFunc(this.props.fieldName, this.state.nameFieldValue)
      this.refs.createItemName.value = ''
      ReactDOM.findDOMNode(this.refs.createItemName).focus()
    } else {
      this.setState({ message: 'Name field required' })
    }
  }

  /**
   * Remove new link from store/form
   * @param {number} index
   * @param {object} e - event object
   */
  removeItem (index, e) {
    e.preventDefault()
    this.props.removeItemFunc(this.props.fieldName, index)
    this.setState(
      {
        editing: false,
        nameFieldValue: '',
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
            <td>{obj}</td>
            <td><button data-index={index} onClick={boundClick} className="btn-floating btn-small waves-effect right"><i className="material-icons">delete</i></button></td>
          </tr>
        )
      })
    }

    return (
      <table styleName="form-array-editor" className="highlight bordered">
        <thead>
          <tr>
            <th data-field="name">Item name</th>
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
              }} ref="createItemName" type="text" placeholder="Item name" />
            </td>
            <td>
              <button onClick={this.addItem.bind(this)} className="btn-floating btn-small waves-effect right"><i className="material-icons">check_circle</i></button>
            </td>
          </tr>
          <tr className={this.state.message ? 'show' : 'hide'}>
            <td colSpan="2"><div className="input-field-message">{this.state.message}</div></td>
          </tr>
        </tbody>
      </table>
    )
  }

}

FormArrayEditor.propTypes = {
  fields: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  addItemFunc: PropTypes.func.isRequired,
  removeItemFunc: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired
}

FormArrayEditor = CssModules(FormArrayEditor, styles)
export default FormArrayEditor
