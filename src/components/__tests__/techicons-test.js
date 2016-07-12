'use strict'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import TechIcons from '../TechIcons/TechIcons'

describe('TechIcons component', () => {
  const data = ['javascript', 'php']
  const devIconPrefix = 'devicon-'
  const techicons = TestUtils.renderIntoDocument(<TechIcons data={data} devIconPrefix={devIconPrefix} />)
  it('renders into document', () => {
    expect(techicons).toExist()
  })
})
