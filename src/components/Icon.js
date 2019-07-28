// Icon.js
import React, { useContext } from 'react'
import { ExpandableContext } from './Expandable'

const Icon = ({ ...otherProps }) => {
  const { expanded } = useContext(ExpandableContext)
  return (
      <span {...otherProps}>
          {expanded ? '-' : '+'}
      </span>
  )
}
export default Icon