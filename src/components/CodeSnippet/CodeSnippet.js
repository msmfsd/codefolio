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
 * @extends {Component}
 */
class CodeSnippet extends Component {

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
    return (
      <div className={this.props.data.display === 'yes' ? 'show' : 'hide'} styleName="cf-code-snippet">
        <p><strong>Code excerpt:</strong></p>
        <pre><code>{this.props.data.code}</code></pre>
      </div>
    )
  }

}

CodeSnippet.propTypes = {
  data: PropTypes.object
}

CodeSnippet = CssModules(CodeSnippet, styles)
export default CodeSnippet
