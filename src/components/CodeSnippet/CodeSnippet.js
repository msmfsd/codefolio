/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import hljs from 'highlight.js'
import styles from './CodeSnippet.css'

/**
 * @class CodeSnippet
 * @extends Component
 */
class CodeSnippet extends Component {

  constructor (props) {
    super(props)
    this.state = { }
  }

  componentDidMount () {
    $('pre code').each(function (i, block) {
      hljs.highlightBlock(block)
    })
  }

  componentDidUpdate () {
    $('pre code').each(function (i, block) {
      hljs.highlightBlock(block)
    })
  }

  render () {
    let hideShowClass = this.props.data.display ? 'show' : 'hide'
    let styleClass = this.props.data.language
    return (
      <div className={hideShowClass} styleName="cf-code-snippet">
        <p><strong>Code excerpt:</strong></p>
        <pre><code className={styleClass}>{this.props.data.code}</code></pre>
      </div>
    )
  }

}

CodeSnippet.propTypes = {
  data: PropTypes.object
}

export default CssModules(CodeSnippet, styles)
