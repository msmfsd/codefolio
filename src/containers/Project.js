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

const Project = connect(mapStateToProps)(ProjectViewer)

export default Project
