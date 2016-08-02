/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import update from 'react/lib/update'
import {
  EDIT_PROJECT,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAIL,
  EDIT_PROJECT_RESET,
  EDIT_PROJECT_SET,
  EDIT_PROJECT_UPLOADING_FILES,
  EDIT_PROJECT_UPLOADING_FILES_COMPLETE,
  EDIT_PROJECT_UPLOADING_FILES_ERROR,
  EDIT_PROJECT_UPDATE_MEDIA,
  EDIT_PROJECT_REMOVE_MEDIA,
  EDIT_PROJECT_ON_SPLICE_FIELD_ARRAY,
  EDIT_PROJECT_ON_PUSH_FIELD_ARRAY,
  EDIT_PROJECT_ADD_LINK,
  EDIT_PROJECT_REMOVE_LINK,
  EDIT_PROJECT_UPDATE_FIELD
} from '../actions/index'

const editProject = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PROJECT:
      return Object.assign({}, state, {
        editProjectLoading: true,
        editProjectErrMessage: null,
        editProjectError: null,
        editProjectSuccess: null
      })
    case EDIT_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        editProjectLoading: false,
        editProjectErrMessage: null,
        editProjectError: null,
        editProjectSuccess: true
      })
    case EDIT_PROJECT_FAIL:
      return Object.assign({}, state, {
        editProjectLoading: false,
        editProjectErrMessage: action.payload,
        editProjectError: true,
        editProjectSuccess: null
      })
    case EDIT_PROJECT_RESET:
      return Object.assign({}, state, {
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
      })
    case EDIT_PROJECT_SET:
      return Object.assign({}, state, {
        editProjectFilesLoading: false,
        editProjectFilesErrMessage: null,
        editProjectFilesError: null,
        editProjectFilesSuccess: null,
        editProjectLoading: false,
        editProjectErrMessage: null,
        editProjectError: null,
        editProjectSuccess: null,
        name: action.project.name,
        role: action.project.role,
        description: action.project.description,
        client: action.project.client,
        viewOrder: action.project.viewOrder,
        sticky: action.project.sticky,
        repoDisplay: action.project.repo.display,
        repoUrl: action.project.repo.repoUrl,
        repoUser: action.project.repo.repoUser,
        repoName: action.project.repo.repoName,
        codeDisplay: action.project.codeSnippet.display,
        code: action.project.codeSnippet.code,
        projectTech: action.project.projectTech,
        linkWeb: action.project.linkWeb,
        media: action.project.media
      })
    case EDIT_PROJECT_UPLOADING_FILES:
      return Object.assign({}, state, {
        editProjectFilesLoading: true,
        editProjectFilesErrMessage: null,
        editProjectFilesError: null,
        editProjectFilesSuccess: null
      })
    case EDIT_PROJECT_UPLOADING_FILES_COMPLETE:
      // TODO update media
      return Object.assign({}, state, {
        editProjectFilesLoading: false,
        editProjectFilesErrMessage: null,
        editProjectFilesError: null,
        editProjectFilesSuccess: true
      })
    case EDIT_PROJECT_UPLOADING_FILES_ERROR:
      return Object.assign({}, state, {
        editProjectFilesLoading: false,
        editProjectFilesErrMessage: action.payload,
        editProjectFilesError: true,
        editProjectFilesSuccess: null
      })
    case EDIT_PROJECT_UPDATE_MEDIA:
      return update(state, {
        media: { $push: action.filenames }
      })
    case EDIT_PROJECT_REMOVE_MEDIA:
      return update(state, {
        media: {$splice: [[action.index, 1]]}
      })
    case EDIT_PROJECT_ON_PUSH_FIELD_ARRAY:
      return update(state, {
        [action.fieldName]: { $push: [action.fieldValue] }
      })
    case EDIT_PROJECT_ON_SPLICE_FIELD_ARRAY:
      return update(state, {
        [action.fieldName]: {$splice: [[action.index, 1]]}
      })
    case EDIT_PROJECT_ADD_LINK:
      return update(state, {
        [action.linkGroup]: {$push: [{ name: action.linkName, url: action.linkUrl }]}
      })
    case EDIT_PROJECT_REMOVE_LINK:
      return update(state, {
        [action.linkGroup]: {$splice: [[action.index, 1]]}
      })
    case EDIT_PROJECT_UPDATE_FIELD:
      return update(state, {
        [action.fieldName]: { $set: action.fieldValue }
      })
    default:
      return state
  }
}

export default editProject
