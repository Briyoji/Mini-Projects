import React from 'react'
import PropTypes from 'prop-types'

export default function Darkmode(props) {
  
  function lightmode () {
    document.documentElement.style.setProperty('--bg-color-primary', 'white');
    document.documentElement.style.setProperty('--fg-color-primary', 'black');
  }

  function darkmode () {
    document.documentElement.style.setProperty('--bg-color-primary', 'black');
    document.documentElement.style.setProperty('--fg-color-primary', 'white');
  }

  function setMode () {
    if (props.mode) {
      darkmode();
    } else {
      lightmode();
    }
  }

  return (
    <>{setMode()}</>
  )
}

Darkmode.propTypes = {
  mode : PropTypes.bool.isRequired
}

Darkmode.defaultProps = {
  mode : false
}