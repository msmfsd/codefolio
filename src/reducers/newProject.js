/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import update from 'react/lib/update'
import {
  NEW_PROJECT,
  NEW_PROJECT_SUCCESS,
  NEW_PROJECT_FAIL,
  NEW_PROJECT_RESET,
  EDIT_PROJECT_RESET,
  NEW_PROJECT_UPLOADING_FILES,
  NEW_PROJECT_UPLOADING_FILES_COMPLETE,
  NEW_PROJECT_UPLOADING_FILES_ERROR,
  NEW_PROJECT_UPDATE_MEDIA,
  NEW_PROJECT_REMOVE_MEDIA,
  NEW_PROJECT_ON_SPLICE_FIELD_ARRAY,
  NEW_PROJECT_ON_PUSH_FIELD_ARRAY,
  NEW_PROJECT_ADD_LINK,
  NEW_PROJECT_REMOVE_LINK,
  NEW_PROJECT_UPDATE_FIELD
} from '../actions/index'

const newProject = (state = {}, action) => {
  switch (action.type) {
    case NEW_PROJECT:
      return Object.assign({}, state, {
        newProjectLoading: true,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: null
      })
    case NEW_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        newProjectLoading: false,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: true
      })
    case NEW_PROJECT_FAIL:
      return Object.assign({}, state, {
        newProjectLoading: false,
        newProjectErrMessage: action.payload,
        newProjectError: true,
        newProjectSuccess: null
      })
    case NEW_PROJECT_RESET:
      return Object.assign({}, state, {
        newProjectFilesLoading: false,
        newProjectFilesMessage: null,
        newProjectLoading: false,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: null,
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
    case EDIT_PROJECT_RESET:
      return Object.assign({}, state, {
        newProjectFilesLoading: false,
        newProjectFilesMessage: null,
        newProjectLoading: false,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: null,
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
    case NEW_PROJECT_UPLOADING_FILES:
      return Object.assign({}, state, {
        newProjectFilesLoading: true,
        newProjectFilesErrMessage: null,
        newProjectFilesError: null,
        newProjectFilesSuccess: null
      })
    case NEW_PROJECT_UPLOADING_FILES_COMPLETE:
      // TODO update media
      return Object.assign({}, state, {
        newProjectFilesLoading: false,
        newProjectFilesErrMessage: null,
        newProjectFilesError: null,
        newProjectFilesSuccess: true
      })
    case NEW_PROJECT_UPLOADING_FILES_ERROR:
      return Object.assign({}, state, {
        newProjectFilesLoading: false,
        newProjectFilesErrMessage: action.payload,
        newProjectFilesError: true,
        newProjectFilesSuccess: null
      })
    case NEW_PROJECT_UPDATE_MEDIA:
      return update(state, {
        media: { $push: action.filenames }
      })
    case NEW_PROJECT_REMOVE_MEDIA:
      return update(state, {
        media: {$splice: [[action.index, 1]]}
      })
    case NEW_PROJECT_ON_PUSH_FIELD_ARRAY:
      return update(state, {
        [action.fieldName]: { $push: [action.fieldValue] }
      })
    case NEW_PROJECT_ON_SPLICE_FIELD_ARRAY:
      return update(state, {
        [action.fieldName]: {$splice: [[action.index, 1]]}
      })
    case NEW_PROJECT_ADD_LINK:
      return update(state, {
        [action.linkGroup]: {$push: [{ name: action.linkName, url: action.linkUrl }]}
      })
    case NEW_PROJECT_REMOVE_LINK:
      return update(state, {
        [action.linkGroup]: {$splice: [[action.index, 1]]}
      })
    case NEW_PROJECT_UPDATE_FIELD:
      return update(state, {
        [action.fieldName]: { $set: action.fieldValue }
      })
    default:
      return state
  }
}

export default newProject
