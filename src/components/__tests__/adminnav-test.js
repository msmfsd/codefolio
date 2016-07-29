'use strict'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import AdminNav from '../admin/AdminNav/AdminNav'

describe('AdminNav component', () => {
  const auth = {
    logoutLoading: false,
    logoutError: true,
    logoutErrMessage: 'Error'
  }
  const location = {
    pathname: '/admin'
  }
  let token = ''
  const newToken = 'AAABBB111222'
  const testFunc = (_token) => {
    token = _token
  }
  const adminNav = TestUtils.renderIntoDocument(<AdminNav onClick={() => testFunc(newToken)} auth={auth} location={location} />)
  it('renders into document', () => {
    expect(adminNav).toExist()
  })
  it('hides back button if showBackBtn is false', () => {
    const hasClass = TestUtils.findRenderedDOMComponentWithClass(adminNav, 'hide')
    expect(hasClass).toExist()
  })
  it('should call testFunc on click', function () {
    const buttonTag = TestUtils.findRenderedDOMComponentWithTag(adminNav, 'button')
    TestUtils.Simulate.click(buttonTag)
    expect(buttonTag).toExist()
    expect(token).toEqual(newToken)
  })
})
