/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import __CONFIG__ from '../../config/config'

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
   * Get github stars for array of repos
   * @param projects : array
   * @returns {object}
   */
  static async FetchGithubData (projects) {
    let newData = []
    for(let project of projects) {
      const response = await fetch('https://api.github.com/repos/' + project.repo.repoUser + '/' + project.repo.repoName)
      const data = await response.json()
      newData.push(data.stargazers_count)
    }
    return newData
  }

}
