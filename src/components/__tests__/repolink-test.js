'use strict'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import RepoLink from '../RepoLink/RepoLink'

describe('RepoLink component', () => {
  const data = {
    display: 'yes',
    repoUrl: 'http://github.com/Automattic/mongoose',
    repoUser: 'Automattic',
    repoName: 'mongoose'
  }
  const repolink = TestUtils.renderIntoDocument(<RepoLink data={data} />)
  it('renders into document', () => {
    expect(repolink).toExist()
  })
  it('shows if display property is yes', () => {
    const hasClass = TestUtils.findRenderedDOMComponentWithClass(repolink, 'show')
    expect(hasClass).toExist()
  })
})
