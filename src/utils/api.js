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
  static async FetchData () {
    const p1 = await fetch(ExternalConfig.API_URL + '/api/profile?apikey=' + ExternalConfig.API_KEY)
    const p2 = await fetch(ExternalConfig.API_URL + '/api/projects?apikey=' + ExternalConfig.API_KEY)
    const [r1, r2] = await Promise.all([p1, p2])
    const [profile, projects] = await Promise.all([r1.json(), r2.json()])
    return { profile: profile, projects: projects }
  }

}
