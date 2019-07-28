//Header.js
import React, { useContext } from 'react'
import { ExpandableContext } from './Expandable'

const Header = ({ children, toggle, ...otherProps }) => {
  return (
    <button onClick={toggle} {...otherProps}>
        {children}
    </button>
  )
}
export default Header