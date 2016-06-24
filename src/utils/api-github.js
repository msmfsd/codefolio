/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */

 /**
  * @class ApiGithub
  * @extends
  */
 export default class ApiGithub {

  /**
   * Get data from Github API
   * @param user : string
   * @param repo : string
   * @returns {object}
   */
  static async FetchData (user, repo) {
    const response = await fetch('https://api.github.com/repos/' + user + '/' + repo);
    const data = await response.json();
    return data;
  }

  /*
  ApiGithub.FetchData(this.props.data.repoUser, this.props.data.repoName)
      .then(apiData => {
        this.handleResponse(apiData)
      })
      .catch(reason => {
        this.handleError(reason)
      })
  */

}
