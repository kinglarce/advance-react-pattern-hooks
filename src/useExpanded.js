// useExpanded.js
import { useCallback, useMemo, useState, useRef } from 'react'

// This will loop through and will invoke all the function that are 
// in the list
// We wouldn’t be able to cater for this case with just a prop collection objec
const callFunctionsInSequence = (...fns) => 
    (...args) => {
        console.log("callback onclick ", fns)
        return fns.forEach(fn => fn && fn(...args))
    }

export default function useExpanded (initialExpanded = false) {
    const [expanded, setExpanded] = useState(initialExpanded)
    const toggle = useCallback(
        () => setExpanded(prevExpanded => !prevExpanded),
        []
    )
    const resetRef = useRef(0)
    const reset = useCallback(
        () => {
            // perform actual reset 
            setExpanded(initialExpanded)
            // update reset count
            ++resetRef.current
        },
        [initialExpanded]
    )

    // Props Collection
    // This will create a new memoized object, 
    // togglerProps, which includes the onClick and aria-expanded properties.
    // const togglerProps = useMemo(
    //     () => ({
    //         onClick: toggle,
    //         'aria-expanded': expanded
    //     }),
    //     [toggle, expanded]
    // )

    // Props Getter
    // This now create a memoized function, 
    // getTogglerProps, that returns the same props collection
    const getTogglerProps = useCallback(
        ({ onClick, ...props } = {}) => ({
            'aria-expanded': expanded,
            // This will invoke both external(users) and internal onclick
            onClick: callFunctionsInSequence(toggle, onClick),
            ...props
        }),
        [toggle, expanded]
    )

    // Note that we’ve called this props collection togglerProps because it 
    // is a prop collection for the toggler
    const value = useMemo(
        () => ({ 
            expanded, 
            toggle, 
            getTogglerProps,
            reset,
            resetDep: resetRef.current
        }), 
        [expanded, toggle, getTogglerProps, reset, resetRef]
    )

  return value
}