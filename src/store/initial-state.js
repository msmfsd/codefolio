/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
const initialState = {
  profile: { loading: false, hasLoaded: false, error: false, errMesage: '', data: {} },
  projects: { loading: false, hasLoaded: false, error: false, errMesage: '', data: [] },
  auth: {
    token: null,
    username: '',
    lastLoggedIn: null,
    authLoading: false,
    authFailed: false,
    errMessage: null,
    error: null,
    logoutLoading: false,
    logoutFail: null,
    logoutErrMessage: null,
    logoutError: null
  }
}

export default initialState
