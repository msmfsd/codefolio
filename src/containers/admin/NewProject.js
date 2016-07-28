/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions'
import NewProjectForm from '../../components/admin/NewProjectForm/NewProjectForm'

const mapStateToProps = ({auth, projects}) => ({auth, projects})

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const NewProject = connect(mapStateToProps, mapDispachToProps)(NewProjectForm)

export default NewProject
