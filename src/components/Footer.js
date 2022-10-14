import React from 'react'
import PropTypes from 'prop-types'

export const Footer = (props) => {
  return (
    <footer className={`bg-${props.mode}`}>
        <p className={`container text-center text-${props.mode === 'light' ? 'dark' : 'light'}`}> &copy; Copyright PCON Hactoberfest 2022</p>
    </footer>
  )
}
