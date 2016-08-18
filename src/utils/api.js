/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/* eslint-disable quote-props*/
import __CONFIG__ from '../../config'

const API_URL = process.env.NODE_ENV !== 'production' ? __CONFIG__.API_DEV_URL : __CONFIG__.API_PROD_URL
const API_KEY = __CONFIG__.API_KEY

/**
* @class Api
*/
export default class Api {

  /**
   * Get profile data from Codefolio API
   * @return {object}
   */
  static async FetchCodefolioProfile () {
    return await fetch(API_URL + '/api/profile?apikey=' + API_KEY)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Get projects data from Codefolio API
   * @return {object}
   */
  static async FetchCodefolioProjects () {
    return await fetch(API_URL + '/api/projects?apikey=' + API_KEY)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Get projects data from Codefolio API by id
   * @param {string} id
   * @return {object}
   */
  static async FetchCodefolioProjectById (id) {
    return await fetch(API_URL + '/api/project/' + id.trim() + API_KEY)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Login admin to Codefolio API
   * @param {object} formData
   * @return {object}
   */
  static async Login (formData) {
    const serialized = JSON.stringify(formData)
    const opts = {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: serialized
    }
    return await fetch(API_URL + '/api/admin/authenticate', opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Logout admin to Codefolio API
   * @param {string} token
   * @return {object}
   */
  static async Logout (token) {
    const opts = {
      method: 'GET',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': token
      }
    }
    return await fetch(API_URL + '/api/admin/logout', opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Register admin to Codefolio API
   * @param {object} formData
   * @return {object}
   */
  static async Register (formData) {
    const serialized = JSON.stringify(formData)
    const opts = {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: serialized
    }
    return await fetch(API_URL + '/api/admin/register', opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Forgot password request for Codefolio API
   * @param {object} formData
   * @return {object}
   */
  static async Forgot (formData) {
    formData.reseturl = window.location.protocol + '//' + window.location.host + '/reset'
    const serialized = JSON.stringify(formData)
    const opts = {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: serialized
    }
    return await fetch(API_URL + '/api/admin/forgotpassword', opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Reset admin password to Codefolio API
   * @param {object} formData
   * @param {string} resetToken
   * @return {object}
   */
  static async Reset (formData, resetToken) {
    const serialized = JSON.stringify(formData)
    const opts = {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: serialized
    }
    return await fetch(API_URL + '/api/admin/resetpassword/' + resetToken, opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Edit admin password to Codefolio API
   * @param {object} formData
   * @param {string} token
   * @return {object}
   */
  static async EditAdmin (formData, token) {
    const serialized = JSON.stringify(formData)
    const opts = {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
      },
      body: serialized
    }
    return await fetch(API_URL + '/api/admin', opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Create new project to Codefolio API
   * @param {object} formData
   * @param {string} token
   * @return {object}
   */
  static async NewProject (formData, token) {
    const serialized = JSON.stringify(formData)
    const opts = {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
      },
      body: serialized
    }
    return await fetch(API_URL + '/api/project', opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Edit project to Codefolio API
   * @param {object} formData
   * @param {string} token
   * @param {string} projectId
   * @return {object}
   */
  static async EditProject (formData, token, projectId) {
    const serialized = JSON.stringify(formData)
    const opts = {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
      },
      body: serialized
    }
    return await fetch(API_URL + '/api/project/' + projectId.trim(), opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Delete project to Codefolio API
   * @param {string} projectId
   * @param {string} token
   * @return {object}
   */
  static async DeleteProject (projectId, token) {
    const opts = {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
      }
    }
    return await fetch(API_URL + '/api/project/' + projectId.trim(), opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Upload project files to Codefolio API
   * @param {array} files
   * @param {string} token
   * @return {object}
   */
  static async UploadProjectFiles (files, token) {
    const formData = new FormData()
    if(files.length > 5) {
      return { success: false, message: 'Error, maximum of 5 files at a time' }
    }
    files.map((obj, index) => {
      let file = files[index]
      if (!file.type.match('image.*') || Math.floor(file.size / 1000) > 1050) {
        return { success: false, message: 'Error, files must be under 1MB and JPG, PNG, or GIF only' }
      }
      formData.append('media', file, file.name)
    })
    const opts = {
      method: 'post',
      headers: {
        'Authorization': token
      },
      body: formData
    }
    return await fetch(API_URL + '/api/project/upload', opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Edit profile to Codefolio API
   * @param {object} formData
   * @param {string} token
   * @return {object}
   */
  static async EditProfile (formData, token) {
    const serialized = JSON.stringify(formData)
    const opts = {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
      },
      body: serialized
    }
    return await fetch(API_URL + '/api/profile', opts)
        .then(response => {
          return response.json()
        })
  }

}
