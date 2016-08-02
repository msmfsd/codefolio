/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { expect } from 'chai'
import update from 'react/lib/update'
import reducer from '../editProject'
import appInitialState from '../../store/initial-state'

/**
 * TEST PROJECTS REDUCER
 */
describe('new project reducer', () => {
  //initial state
  const initialState = appInitialState.editProject
  // EDIT_PROJECT
  it('Handles EDIT_PROJECT', () => {
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT',
      payload: {
        editProjectLoading: true,
        editProjectErrMessage: null,
        editProjectError: null,
        editProjectSuccess: null
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editProjectLoading: true,
      editProjectErrMessage: null,
      editProjectError: null,
      editProjectSuccess: null
    }))
  })
  // EDIT_PROJECT_SUCCESS
  it('Handles EDIT_PROJECT_SUCCESS', () => {
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT_SUCCESS',
      payload: {
        editProjectLoading: false,
        editProjectErrMessage: null,
        editProjectError: null,
        editProjectSuccess: true
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editProjectLoading: false,
      editProjectErrMessage: null,
      editProjectError: null,
      editProjectSuccess: true
    }))
  })

  // EDIT_PROJECT_FAIL
  it('Handles EDIT_PROJECT_FAIL', () => {
    const error = 'Some Error'
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT_FAIL',
      payload: error
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editProjectLoading: false,
      editProjectErrMessage: error,
      editProjectError: true,
      editProjectSuccess: null
    }))
  })

  // EDIT_PROJECT_RESET
  it('Handles EDIT_PROJECT_RESET', () => {
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT_RESET',
      payload: {
        editProjectFilesLoading: false,
        editProjectFilesErrMessage: null,
        editProjectFilesError: null,
        editProjectFilesSuccess: null,
        editProjectLoading: false,
        editProjectErrMessage: null,
        editProjectError: null,
        editProjectSuccess: null,
        name: '',
        role: '',
        description: '',
        client: '',
        viewOrder: 1,
        sticky: 0,
        repoDisplay: 'no',
        repoUrl: '',
        repoUser: '',
        repoName: '',
        codeDisplay: 'no',
        code: '',
        projectTech: [],
        linkWeb: [],
        media: []
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editProjectFilesLoading: false,
      editProjectFilesErrMessage: null,
      editProjectFilesError: null,
      editProjectFilesSuccess: null,
      editProjectLoading: false,
      editProjectErrMessage: null,
      editProjectError: null,
      editProjectSuccess: null,
      name: '',
      role: '',
      description: '',
      client: '',
      viewOrder: 1,
      sticky: 0,
      repoDisplay: 'no',
      repoUrl: '',
      repoUser: '',
      repoName: '',
      codeDisplay: 'no',
      code: '',
      projectTech: [],
      linkWeb: [],
      media: []
    }))
  })
  // EDIT_PROJECT_UPLOADING_FILES
  it('Handles EDIT_PROJECT_UPLOADING_FILES', () => {
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT_UPLOADING_FILES',
      payload: {
        editProjectFilesLoading: true,
        editProjectFilesErrMessage: null,
        editProjectFilesError: null,
        editProjectFilesSuccess: null
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editProjectFilesLoading: true,
      editProjectFilesErrMessage: null,
      editProjectFilesError: null,
      editProjectFilesSuccess: null
    }))
  })
  // EDIT_PROJECT_UPLOADING_FILES_COMPLETE
  it('Handles EDIT_PROJECT_UPLOADING_FILES_COMPLETE', () => {
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT_UPLOADING_FILES_COMPLETE',
      payload: {
        editProjectFilesLoading: false,
        editProjectFilesErrMessage: null,
        editProjectFilesError: null,
        editProjectFilesSuccess: true
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editProjectFilesLoading: false,
      editProjectFilesErrMessage: null,
      editProjectFilesError: null,
      editProjectFilesSuccess: true
    }))
  })

  // EDIT_PROJECT_UPLOADING_FILES_ERROR
  it('Handles EDIT_PROJECT_UPLOADING_FILES_ERROR', () => {
    const error = 'Some Error'
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT_UPLOADING_FILES_ERROR',
      payload: error
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editProjectFilesLoading: false,
      editProjectFilesErrMessage: error,
      editProjectFilesError: true,
      editProjectFilesSuccess: null
    }))
  })

  // EDIT_PROJECT_UPDATE_MEDIA
  it('Handles EDIT_PROJECT_UPDATE_MEDIA', () => {
    const filenames = ['img1.png', 'img2.png']
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT_UPDATE_MEDIA',
      filenames
    })
    const reducerState = update(initialState, {
      media: { $set: filenames }
    })
    expect(newState).to.eql(reducerState)
  })

  // EDIT_PROJECT_REMOVE_MEDIA
  it('Handles EDIT_PROJECT_REMOVE_MEDIA', () => {
    const filenames = ['img1.png', 'img2.png']
    const initialStateMedia = initialState
    initialStateMedia.media = filenames
    const index = 0;
    const newState = reducer(initialStateMedia, {
      type: 'EDIT_PROJECT_REMOVE_MEDIA',
      index
    })
    const reducerState = update(initialState, {
      media: {$splice: [[index, 1]]}
    })
    expect(newState).to.eql(reducerState)
  })

  // EDIT_PROJECT_ON_PUSH_FIELD_ARRAY
  it('Handles EDIT_PROJECT_ON_PUSH_FIELD_ARRAY', () => {
    const fieldName = 'projectTech'
    const fieldValue = 'php'
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT_ON_PUSH_FIELD_ARRAY',
      fieldName,
      fieldValue
    })
    const reducerState = update(initialState, {
      [fieldName]: { $push: [fieldValue] }
    })
    expect(newState).to.eql(reducerState)
  })

  // EDIT_PROJECT_ON_SPLICE_FIELD_ARRAY
  it('Handles EDIT_PROJECT_ON_SPLICE_FIELD_ARRAY', () => {
    const fieldName = 'projectTech'
    const index = 0
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT_ON_SPLICE_FIELD_ARRAY',
      fieldName,
      index
    })
    const reducerState = update(initialState, {
      [fieldName]: {$splice: [[index, 1]]}
    })
    expect(newState).to.eql(reducerState)
  })

  // EDIT_PROJECT_ADD_LINK
  it('Handles EDIT_PROJECT_ADD_LINK', () => {
    const linkGroup = 'linkWeb'
    const linkName = 'linktosite.com'
    const linkUrl = 'http://linktosite.com'
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT_ADD_LINK',
      linkGroup,
      linkName,
      linkUrl
    })
    const reducerState = update(initialState, {
      [linkGroup]: {$push: [{ name: linkName, url: linkUrl }]}
    })
    expect(newState).to.eql(reducerState)
  })

  // EDIT_PROJECT_REMOVE_LINK
  it('Handles EDIT_PROJECT_REMOVE_LINK', () => {
    const linkGroup = 'linkWeb'
    const index = 0
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT_REMOVE_LINK',
      linkGroup,
      index
    })
    const reducerState = update(initialState, {
      [linkGroup]: {$splice: [[index, 1]]}
    })
    expect(newState).to.eql(reducerState)
  })

  // EDIT_PROJECT_UPDATE_FIELD
  it('Handles EDIT_PROJECT_UPDATE_FIELD', () => {
    const fieldName = 'projectTech'
    const fieldValue = 'php'
    const newState = reducer(initialState, {
      type: 'EDIT_PROJECT_UPDATE_FIELD',
      fieldName,
      fieldValue
    })
    const reducerState = update(initialState, {
      [fieldName]: { $set: fieldValue }
    })
    expect(newState).to.eql(reducerState)
  })

})
