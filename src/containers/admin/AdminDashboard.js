/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions'
import AdminDashboardViewer from '../../components/admin/AdminDashboardViewer/AdminDashboardViewer'

const mapStateToProps = ({auth}) => ({auth})

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const AdminDashboard = connect(mapStateToProps, mapDispachToProps)(AdminDashboardViewer)

export default AdminDashboard
