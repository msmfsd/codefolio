/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
// TODO - config

/**
* @class Api
*/
export default class Api {

  /**
   * Get profile data from Codefolio API
   * @returns {object}
   */
  static async FetchCodefolioProfile () {
    return await fetch('http://' + 'localhost:8090' + '/api/profile?apikey=' + 'D6F319D4D224147BDCDBE493E3FDE')
        .then(response => {
          return response.json()
        })
  }

  /**
   * Get projects data from Codefolio API
   * @returns {object}
   */
  static async FetchCodefolioProjects () {
    return await fetch('http://' + 'localhost:8090' + '/api/projects?apikey=' + 'D6F319D4D224147BDCDBE493E3FDE')
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
    return await fetch('http://' + 'localhost:8090' + '/api/project/' + id.trim() + '?apikey=D6F319D4D224147BDCDBE493E3FDE')
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
    for( let project of projects ) {
      const response = await fetch('https://api.github.com/repos/' + project.repo.repoUser + '/' + project.repo.repoName)
      const data = await response.json()
      newData.push(data.stargazers_count)
    }
    return newData
  }

}
