'use strict'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import IconLinks from '../IconLinks/IconLinks'

describe('IconLinks component', () => {
  const data = [
    {
      url: 'http://github.com/swoz',
      name: 'github.com/swoz'
    },
    {
      url: 'http://blogger.woz-blog.com',
      name: 'blogger.woz-blog.com'
    }
  ]
  const icon = 'link'
  const iconlink = TestUtils.renderIntoDocument(<IconLinks data={data} icon={icon} />)
  it('renders into document', () => {
    expect(iconlink).toExist()
  })
  it('hides if data props is empty', () => {
    const emptyArr = []
    const iconlinkHide = TestUtils.renderIntoDocument(<IconLinks data={emptyArr} icon={icon} />)
    const hasClass = TestUtils.findRenderedDOMComponentWithClass(iconlinkHide, 'hide')
    expect(hasClass).toExist()
  })
})
