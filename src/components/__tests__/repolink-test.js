'use strict'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import RepoLink from '../RepoLink/RepoLink'

describe('RepoLink component', () => {
  const data = {
    display: false,
    repoUrl: 'http://github.com/Automattic/mongoose',
    repoUser: 'Automattic',
    repoName: 'mongoose'
  }
  const repolink = TestUtils.renderIntoDocument(<RepoLink data={data} />)
  it('renders into document', () => {
    expect(repolink).toExist()
  })
  it('hides if display property is false', () => {
    const hasClass = TestUtils.findRenderedDOMComponentWithClass(repolink, 'hide')
    expect(hasClass).toExist()
  })
})
