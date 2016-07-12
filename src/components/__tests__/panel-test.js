'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import Panel from '../Panel/Panel'

describe('Panel component', () => {
  const message = 'Some message'
  const panel = TestUtils.renderIntoDocument(<Panel message={message} />)
  const panelNode = ReactDOM.findDOMNode(panel)
  it('renders into document', () => {
    expect(panel).toExist()
  })
  it('renders message', () => {
    expect(panelNode.textContent).toEqual('Some message')
  })
})
