import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
// TODO
import App from '../'

describe('<App/>', () => {
  it('Should have children', () =>{
    const handleClick = sinon.spy()
    const wrapper = shallow(<App />)

    wrapper.find('a').simulate('click', {preventDefault: () => {}})

    expect(handleClick.calledOnce).to.equal(true)
  })

  it('Should render inner text', () => {
    const wrapper = shallow(<App> hi </App>)
    expect(wrapper.text()).to.contain('hi')
  })
})
