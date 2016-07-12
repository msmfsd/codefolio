'use strict'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import NotFound from '../NotFound/NotFound'

describe('NotFound component', () => {
  const notfound = TestUtils.renderIntoDocument(<NotFound />)
  const h1 = TestUtils.findRenderedDOMComponentWithTag(notfound, 'h1')
  it('renders into document', () => {
    expect(notfound).toExist()
  })
  it('renders not found heading', () => {
    expect(h1.textContent).toEqual('404')
  })
})
