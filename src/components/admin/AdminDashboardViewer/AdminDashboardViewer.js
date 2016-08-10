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

  constructor (props) {
    super(props)
    this.state = { deleteId: null }
  }

  componentDidMount () {
    // ensure API data and redux store sync
    // by always refreshing data on mount
    if(!this.props.projects.loading) {
      this.props.fetchProjectsAsync()
    }
  }

  /**
   * Prepare to remove project by id
   * @param id : string
   * @param e : dom node event object
   */
  deleteProject (id, e) {
    e.preventDefault()
    this.setState({ deleteId: id })
    $('#modal1').openModal()
  }

  /**
   * Remove project by current deleteId
   * @param e : dom node event object
   */
  deleteProjectConfirm (e) {
    e.preventDefault()
    this.props.deleteProjectAsync(this.state.deleteId, this.props.auth.token)
  }

  /**
   * Cancel remove project by current deleteId
   * @param e : dom node event object
   */
  deleteProjectCancel (e) {
    e.preventDefault()
    this.setState({ deleteId: null })
  }

  render () {
    const { projects } = this.props
    return (
      <div>
        <div className="row">
          <div className="col s12 m6">
            <div className="card">
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
            <div className="card">
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
            <div className="card">
              <div className="card-content">
                <span className="card-title">Projects</span>
                <p>Manage your public folio projects to showcase your development work. Edit current projects below or create a new project.</p>
                <p><Link styleName="admin-btn-create" className="btn" to={'/admin/new-project'}>Create new project</Link></p>
              </div>
              <div styleName="card-action-full" className="card-action left">
                <div className={projects.loading || projects.error ? 'show' : 'hide'}>
                  {projects.error ? <div styleName="card-padding" className="card-panel">{projects.errMessage}</div> : <div styleName="cf-progress"><div className="progress"><div className="indeterminate"></div></div></div>}
                </div>
                <div className={projects.loading ? 'hide' : 'show'}>
                  <ul styleName="cf-projects-list" className={projects.loading || projects.error ? 'hide' : 'show'}>
                    {
                      projects.data.map((obj, index) => {
                        return (<li key={index} styleName="cf-project-link-item" className="hoverable">
                          <div>
                            <h6 className="truncate">
                              {obj.name}
                              <span className="truncate">view order: {obj.viewOrder}{obj.sticky === 1 ? ' | featured' : ''}</span>
                            </h6>
                            <Link to={'/admin/edit-project/' + obj.slug} className="btn-floating hoverable"><i className="material-icons">mode_edit</i></Link>
                            <a href="#" onClick={(this.deleteProject.bind(this, obj._id))} className="btn-floating hoverable"><i className="material-icons">delete</i></a>
                          </div>
                        </li>)
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="modal1" className="modal">
          <div className="modal-content"><p>Are you sure you want to delete this project?</p></div>
          <div className="modal-footer">
            <a href="#" onClick={this.deleteProjectConfirm.bind(this)} className="modal-action modal-close btn-flat">Delete</a>
            <a href="#" onClick={this.deleteProjectCancel.bind(this)} className="modal-action modal-close btn-flat">Cancel</a>
          </div>
        </div>
      </div>
    )
  }
}

AdminDashboardViewer.propTypes = {
  auth: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  deleteProjectAsync: PropTypes.func.isRequired,
  fetchProjectsAsync: PropTypes.func.isRequired
}

export default CssModules(AdminDashboardViewer, styles)
