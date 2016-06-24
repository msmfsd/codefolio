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
   * Get data from Github API
   * @param user : string
   * @param repo : string
   * @returns {object}
   */
  static async FetchGithubData (user, repo) {
    const response = await fetch('https://api.github.com/repos/' + user + '/' + repo);
    const data = await response.json();
    return data;
  }

  /*
  // usage
  ApiGithub.FetchGithubData(this.props.data.repoUser, this.props.data.repoName)
      .then(apiData => {
      log(apiData)
      log(apiData.watchers)
      })
      .catch(reason => {
        log(reason)
      })
  */

}
