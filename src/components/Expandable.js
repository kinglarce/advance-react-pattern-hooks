import React, { 
    createContext, 
    useState, 
    useCallback, 
    useMemo, 
    useEffect, 
    useRef 
} from 'react'
import Header from './Header'
import Icon from './Icon'
import Body from './Body'

// This context API will be the way to communicate to the children of Expandable
export const ExpandableContext = createContext()
// This will always have "Provider object"
const { Provider } = ExpandableContext

const Expandable = ({ children, onExpand, shouldExpand, ...otherProps }) => {
    const [expanded, setExpanded] = useState(false)
    const toggle = useCallback(
        () => setExpanded(prevExpanded => !prevExpanded),
        []
    )
    
    const isExpandControlled = shouldExpand !== undefined
    const getToggle = isExpandControlled ? onExpand : toggle
    const getExpanded = isExpandControlled ? shouldExpand : expanded

    // `useMemo` takes a callback that returns the object value `{expanded, toggle}`
    // and we pass an array dependency [expanded, toggle]
    const value = useMemo(
      () => ({ expanded: getExpanded, toggle: getToggle }), 
      [getExpanded, getToggle]
    )
    
    // This will keep the value constant and prevent from changing when we're re-rendering
    const componentJustMounted = useRef(true)

    // Trigger it as a callback and we only want to trigger it only when `expanded`
    // changed value and prevent calling it on mounting 
    useEffect(
        () => {
        if (!componentJustMounted.current && !isExpandControlled) {
                // This is a custom function from the caller of the `Expandable` component
                // to trigger a callback if `expanded` changed values
                onExpand(expanded)
            }
            componentJustMounted.current = false
        },
        // React Hook useEffect has a missing dependency: 'onExpand'. Either include it or 
        // remove the dependency array. If 'onExpand' changes too often, find the parent 
        // component that defines it and wrap that definition in useCallback
        [expanded, onExpand, isExpandControlled]
    )
    return (
        <Provider value={value}>
            <div {...otherProps}>
                {children}
            </div>
        </Provider>
    )
}

Expandable.Header = Header
Expandable.Body = Body
Expandable.Icon = Icon
export default Expandable