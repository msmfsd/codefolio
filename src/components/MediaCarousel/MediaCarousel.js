/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import React, { Component, PropTypes } from 'react'
import CssModules from 'react-css-modules'
import ExternalConfig from 'ExternalConfig'
import styles from './MediaCarousel.css'

/**
 * @class MediaCarousel
 * @extends Component
 */
class MediaCarousel extends Component {

  constructor (props) {
    super(props)
    this.state = {
      projectsImgDir: ExternalConfig.API_URL + ExternalConfig.API_IMG_UPLOAD_DIR + 'projects/'
    }
  }

  componentDidMount () {
    // initialise any non-react dom manipulation
    $('.slider').slider({ height: 380, interval: 10000 })
  }

  render () {
    let media = this.props.data.map((obj, index) => {
      return (<li key={index}><img src={this.state.projectsImgDir + obj}/></li>)
    })
    return (
      <div styleName="cf-media-carousel">
        <div className="slider">
          <ul className="slides">{media}</ul>
        </div>
      </div>
    )
  }

}

MediaCarousel.propTypes = {
  data: PropTypes.array
}

export default CssModules(MediaCarousel, styles)
