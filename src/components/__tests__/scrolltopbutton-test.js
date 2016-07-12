'use strict'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import ScrollTopButton from '../ScrollTopButton/ScrollTopButton'

describe('ScrollTopButton component', () => {
  const scrolltopbtn = TestUtils.renderIntoDocument(<ScrollTopButton scrollSpeed={10} />)
  it('renders into document', () => {
    expect(scrolltopbtn).toExist()
  })
  it('has btn class', () => {
    const hasClass = TestUtils.findRenderedDOMComponentWithClass(scrolltopbtn, 'btn')
    expect(hasClass).toExist()
  })
})
