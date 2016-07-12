'use strict'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import Avatar from '../Avatar/Avatar'

describe('Avatar component', () => {
  const data = {
    use: 'customAvatar',
    gravitarEmail: '',
    customAvatar: 'avatar.jpg',
    defaultAvatar: ''
  }
  const avatar = TestUtils.renderIntoDocument(<Avatar data={data} />)
  it('renders into document', () => {
    expect(avatar).toExist()
  })
  it('has a classname of hoverable', () => {
    const hasClass = TestUtils.findRenderedDOMComponentWithClass(avatar, 'hoverable')
    expect(hasClass).toExist()
  })
})
