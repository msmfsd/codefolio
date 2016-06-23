/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { assert, expect }  from 'chai'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Panel from '../src/components/Panel/Panel'

/**
 * Component: Panel
 */
describe('Panel component:', function () {
  const str = "Yeah!!!"
  const main = TestUtils.renderIntoDocument(<Panel message={str}>{str}</Panel>)
  it('Renders without problems', function (done) {
    expect(main).to.not.be.null
    done()
  })
  it('Renders its default props', function (done) {
    expect(main.props.message).to.equal('Yeah!!!')
    done()
  })
})
