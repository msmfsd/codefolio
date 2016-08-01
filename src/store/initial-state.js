/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
const initialState = {
  profile: {
    loading: false,
    hasLoaded: false,
    error: null,
    errMessage: null,
    data: {},
    editProfileLoading: false,
    editProfileErrMessage: null,
    editProfileError: null,
    editProfileSuccess: null
  },
  projects: {
    loading: false,
    hasLoaded: false,
    error: null,
    errMessage: null,
    data: []
  },
  editProject: {
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
  },
  admin: {
    editAdminLoading: false,
    editAdminErrMessage: null,
    editAdminError: null
  },
  auth: {
    token: null,
    username: '',
    lastLoggedIn: null,
    authLoading: false,
    errMessage: null,
    error: null,
    logoutLoading: false,
    logoutErrMessage: null,
    logoutError: null,
    registerLoading: false,
    registerErrMessage: null,
    registerError: null,
    registerSuccess: null,
    forgotLoading: false,
    forgotErrMessage: null,
    forgotError: null,
    forgotSuccess: null,
    resetLoading: false,
    resetFail: null,
    resetErrMessage: null,
    resetError: null,
    resetSuccess: null
  }
}

export default initialState
