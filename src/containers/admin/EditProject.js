/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions'
import EditProjectForm from '../../components/admin/EditProjectForm/EditProjectForm'

const mapStateToProps = ({auth, projects}) => ({auth, projects})

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const EditProject = connect(mapStateToProps, mapDispachToProps)(EditProjectForm)

export default EditProject
