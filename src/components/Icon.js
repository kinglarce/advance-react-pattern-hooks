// Icon.js
import { useContext } from 'react'
import { ExpandableContext } from './Expandable'

const Icon = () => {
  const { expanded } = useContext(ExpandableContext)
  return expanded ? '-' : '+'
}
export default Icon