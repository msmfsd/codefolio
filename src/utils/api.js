/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import ExternalConfig from 'ExternalConfig'

 /**
  * @class Api
  * @extends
  */
 export default class Api {

  /**
   * Get data from Codefolio API
   * @returns {object}
   */
  static async FetchCodefolioData () {
    const p1 = await fetch(ExternalConfig.API_URL + '/api/profile?apikey=' + ExternalConfig.API_KEY)
    const p2 = await fetch(ExternalConfig.API_URL + '/api/projects?apikey=' + ExternalConfig.API_KEY)
    const [r1, r2] = await Promise.all([p1, p2])
    const [profile, projects] = await Promise.all([r1.json(), r2.json()])
    return { profile: profile, projects: projects }
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
