// Body.js
import React, { useContext } from 'react'
import { ExpandableContext } from './Expandable'

const Body = ({ children, expanded, ...otherProps }) => {
  return expanded ? (
    <div {...otherProps}>
        {children}
    </div>
  ) : null
}
export default Body