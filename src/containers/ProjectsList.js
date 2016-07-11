/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import ProjectsListViewer from '../components/ProjectsListViewer/ProjectsListViewer'

const mapStateToProps = (state) => {
  return { projects: state.projects }
}

function mapDispachToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}
// TODO: remove ', null, {pure:false}' once react-router v3 release
const ProjectsList = connect(mapStateToProps, mapDispachToProps, null, { pure: false })(ProjectsListViewer)

export default ProjectsList
