// Icon.js
import React, { useContext } from 'react'
import { ExpandableContext } from './Expandable'

const Icon = ({ expanded, ...otherProps }) => {
  return (
      <span {...otherProps}>
          {expanded ? '-' : '+'}
      </span>
  )
}
export default Icon