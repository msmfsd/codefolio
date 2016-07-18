/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions'
import ResetForm from '../../components/admin/ResetForm/ResetForm'

const mapStateToProps = ({auth}) => ({auth})

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const Reset = connect(mapStateToProps, mapDispachToProps)(ResetForm)

export default Reset
