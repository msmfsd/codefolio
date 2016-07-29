'use strict'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import FormMediaEditor from '../admin/FormMediaEditor/FormMediaEditor'
import Dropzone from 'react-dropzone'

describe('FormMediaEditor component', () => {
  const auth = {
    logoutLoading: false
  }
  const newProject = {
    newProjectFilesLoading: true
  }
  const uploadAsyncFunc = () => {
    return true
  }

  const formMediaEditor = TestUtils.renderIntoDocument(<FormMediaEditor uploadAsyncFunc={() => uploadAsyncFunc()} auth={auth} newProject={newProject} />)
  it('renders into document', () => {
    expect(formMediaEditor).toExist()
  })

  it('should be rendered with Dropzone component as a child', () => {
    const child = TestUtils.findRenderedComponentWithType(formMediaEditor, Dropzone)
    expect(TestUtils.isCompositeComponentWithType(child, Dropzone)).toBe(true)
  })

  it('should have files state as an array', () => {
    expect(formMediaEditor.state.files).toEqual([])
  })

})
