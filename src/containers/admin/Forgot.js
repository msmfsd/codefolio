/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions'
import ForgotForm from '../../components/admin/ForgotForm/ForgotForm'

const mapStateToProps = ({auth}) => ({auth})

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const Forgot = connect(mapStateToProps, mapDispachToProps)(ForgotForm)

export default Forgot
