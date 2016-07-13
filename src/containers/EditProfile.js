/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import EditProfileForm from '../components/EditProfileForm/EditProfileForm'

const mapStateToProps = (state) => {
  return { state }
}

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const EditProfile = connect(mapStateToProps, mapDispachToProps)(EditProfileForm)

export default EditProfile
