/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import styles from './AdminDashboardViewer.css'

/**
 * @class AdminDashboardViewer
 * @extends Component
 */
class AdminDashboardViewer extends Component {

  componentDidMount () {
    // ensure API data and redux store sync
    // by always refreshing data on mount
    if(!this.props.projects.loading) {
      this.props.fetchProjectsAsync()
    }
  }

  render () {
    const { projects } = this.props
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <h3>Admin Dashboard</h3>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6">
            <div className="card hoverable">
              <div className="card-content">
                <span className="card-title">Admin settings</span>
                <p>View administrator username and last logged in date and change your admin password.</p>
              </div>
              <div className="card-action">
                <Link styleName="admin-btn" className="btn" to={'/admin/edit-administrator'}>VIEW</Link>
              </div>
            </div>
          </div>
          <div className="col s12 m6">
            <div className="card hoverable">
              <div className="card-content">
                <span className="card-title">Profile settings</span>
                <p>Manage your public folio profile to update your avatar, details, technology set, contacts and bio.</p>
              </div>
              <div className="card-action">
                <Link styleName="admin-btn" className="btn" to={'/admin/edit-profile'}>Edit</Link>
              </div>
            </div>
          </div>
          <div className="col s12">
            <div className="card hoverable">
              <div className="card-content">
                <span className="card-title">Projects</span>
                <p>Manage your public folio projects to showcase your development work. Edit current projects below or:<br /><br /><Link styleName="admin-btn" className="btn" to={'/admin/new-project'}>Create new project</Link></p>
              </div>
              <div className="card-action left">
                <div className={projects.loading || projects.error ? 'show' : 'hide'}>
                  {projects.error ? <div styleName="card-padding" className="card-panel">Projects failed to fetch. API server unreachable.</div> : <div styleName="cf-progress"><div className="progress"><div className="indeterminate"></div></div></div>}
                </div>
                <div className={projects.loading || projects.error ? 'hide' : 'show'}>
                  <ul styleName="cf-projects-list">
                    {
                      projects.data.map((obj, index) => {
                        return (<li key={index} styleName="cf-project-link-item">
                          <Link className="hoverable" activeClassName="active-link" to={'/admin/edit-project/' + obj.slug}>
                            <h6 className="truncate">{index + 1} - {obj.name}</h6>
                            <span className="truncate">Order: {obj.viewOrder} | Sticky: {obj.sticky === 1 ? 'Yes' : 'No'}</span>
                            <i className="material-icons">mode_edit</i>
                          </Link>
                        </li>)
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdminDashboardViewer.propTypes = {
  projects: PropTypes.object.isRequired
}

export default CssModules(AdminDashboardViewer, styles)
