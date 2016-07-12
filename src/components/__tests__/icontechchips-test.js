'use strict'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import IconTechChips from '../IconTechChips/IconTechChips'

describe('IconTechChips component', () => {
  const data = [ 'PHP', 'CSS3', 'Express js' ]
  const icon = 'code'
  const icontechchips = TestUtils.renderIntoDocument(<IconTechChips data={data} icon={icon} />)
  it('renders into document', () => {
    expect(icontechchips).toExist()
  })
})
