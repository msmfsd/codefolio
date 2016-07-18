/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/* eslint-disable quote-props*/
import __CONFIG__ from '../../cf.config'

const API_URL = process.env.NODE_ENV !== 'production' ? __CONFIG__.development.API_URL : __CONFIG__.production.API_URL
const API_KEY = process.env.NODE_ENV !== 'production' ? __CONFIG__.development.API_KEY : __CONFIG__.production.API_KEY

/**
* @class Api
*/
export default class Api {

  /**
   * Get profile data from Codefolio API
   * @returns {object}
   */
  static async FetchCodefolioProfile () {
    return await fetch(API_URL + '/api/profile?apikey=' + API_KEY)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Get projects data from Codefolio API
   * @returns {object}
   */
  static async FetchCodefolioProjects () {
    return await fetch(API_URL + '/api/projects?apikey=' + API_KEY)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Get projects data from Codefolio API
   * @param id : string
   * @returns {object}
   */
  static async FetchCodefolioProjectById (id) {
    return await fetch(API_URL + '/api/project/' + id.trim() + API_KEY)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Login admin to Codefolio API
   * @param username : string
   * @param password : string
   * @returns {object}
   */
  static async Login (username, password) {
    const opts = {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'email=' + username + '&password=' + password
    }
    return await fetch(API_URL + '/api/admin/authenticate', opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Login admin to Codefolio API
   * @param token : string
   * @returns {object}
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
   * @param username : string
   * @param password : string
   * @returns {object}
   */
  static async Register (username, password) {
    const opts = {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'email=' + username + '&password=' + password
    }
    return await fetch(API_URL + '/api/admin/register', opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Forgot password request for Codefolio API
   * @param username : string
   * @returns {object}
   */
  static async Forgot (username) {
    const reseturl = window.location.protocol + '//' + window.location.host + '/reset'
    const opts = {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'email=' + username + '&reseturl=' + reseturl
    }
    return await fetch(API_URL + '/api/admin/forgotpassword', opts)
        .then(response => {
          return response.json()
        })
  }

  /**
   * Reset admin password to Codefolio API
   * @param password : string
   * @param confirm : string
   * @returns {object}
   */
  static async Reset (password, confirm, resetToken) {
    const opts = {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'password=' + password + '&confirm=' + confirm
    }
    return await fetch(API_URL + '/api/admin/resetpassword/' + resetToken, opts)
        .then(response => {
          return response.json()
        })
  }

}
