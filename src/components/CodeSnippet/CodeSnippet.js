/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
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
    // If this component is mounted using router
    // External Prism lib will not render it
    Prism.highlightAll();
  }

  render () {
    return (
      <div styleName="cf-code-snippet">
        <p><strong>Code excerpt:</strong></p>
        <pre><code className={this.props.language}>{this.props.code}</code></pre>
      </div>
    )
  }

}

CodeSnippet.propTypes = {
  language: PropTypes.string,
  code: PropTypes.string
}

export default CssModules(CodeSnippet, styles)
