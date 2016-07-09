/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import ProjectViewer from '../components/ProjectViewer/ProjectViewer'

const mapStateToProps = (state) => {
  return { projects: state.projects }
}

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const Project = connect(mapStateToProps, mapDispachToProps)(ProjectViewer)

export default Project
