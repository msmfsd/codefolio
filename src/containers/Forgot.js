/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import ForgotForm from '../components/ForgotForm/ForgotForm'

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const Forgot = connect(mapStateToProps, mapDispachToProps)(ForgotForm)

export default Forgot
