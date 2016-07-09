/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import ProfileViewer from '../components/ProfileViewer/ProfileViewer'

const mapStateToProps = (state) => {
  return { profile: state.profile }
}

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const Profile = connect(mapStateToProps, mapDispachToProps)(ProfileViewer)

export default Profile
