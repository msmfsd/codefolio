/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import EditProjectsForm from '../components/EditProjectsForm/EditProjectsForm'

const mapStateToProps = ({auth}) => ({auth})

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const EditProjects = connect(mapStateToProps, mapDispachToProps)(EditProjectsForm)

export default EditProjects
