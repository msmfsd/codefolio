/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions'
import EditAdministratorForm from '../../components/admin/EditAdministratorForm/EditAdministratorForm'

const mapStateToProps = ({auth}) => ({auth})

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const EditAdministrator = connect(mapStateToProps, mapDispachToProps)(EditAdministratorForm)

export default EditAdministrator
