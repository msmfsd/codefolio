import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'
import styles from './LoginForm.css'

/**
 * @class LoginForm
 * @extends Component
 */
class LoginForm extends Component {

  render () {
    const { authSetLoggedIn, authSetLoggedOut } = this.props
    return (
      <div>
        <h4>LoginForm component</h4>
        <a className="btn" onClick={() => authSetLoggedIn('JGHJGHJHGJGHJHG', 'admin logged in success')}>Set logged in to true and token and message</a><br />
        <a className="btn" onClick={() => authSetLoggedOut('admin logged out')}>Logout</a><br />
        <Link className="btn" to={'/admin'}>Now go to admin dashboard</Link>
      </div>
    )
  }
}

LoginForm.propTypes = {
  auth: PropTypes.object.isRequired,
  authSetLoggedIn: PropTypes.func,
  authSetLoggedOut: PropTypes.func,
  dispatch: PropTypes.func
}

export default CssModules(LoginForm, styles)
