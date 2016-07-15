/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import RegisterForm from '../components/RegisterForm/RegisterForm'

const mapStateToProps = ({auth}) => ({auth})

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const Register = connect(mapStateToProps, mapDispachToProps)(RegisterForm)

export default Register
