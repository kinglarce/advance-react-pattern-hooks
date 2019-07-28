// useExpanded.js
import { useCallback, useMemo, useReducer, useRef } from 'react'

// This will loop through and will invoke all the function that are 
// in the list
// We wouldn’t be able to cater for this case with just a prop collection objec
const callFunctionsInSequence = (...fns) => 
    (...args) => {
        console.log("callback onclick ", fns)
        return fns.forEach(fn => fn && fn(...args))
    }

const internalReducer = (state, action) => {
    switch (action.type) {
        case useExpanded.types.toggleExpand:
            return {
                ...state,
                expanded: !state.expanded //toggle expand state property
            }
        case useExpanded.types.reset:
            return {
                ...state,
                expanded: action.payload // reset expanded with a payload
            }
        case useExpanded.types.override:
            return {
                ...state,
                expanded: !state.expanded // update state
            }
        default:
            throw new Error(`Action type ${action.type} not handled`)
    }
}

export default function useExpanded (initialExpanded = false, userReducer = (s, a) => a.internalChanges) {
    // keep initial state in a const variable
    // NB: state is now an object e.g {expanded: false}
    const initialState = { expanded: initialExpanded }

    //The problem with this is that our internal reducer always returns our internal 
    // proposed new state. This isn’t the behavior we want. Before we decide what the 
    // expanded state will be, we need to communicate our proposed state change to the external
    // This is to resolve changes between our internal implementation and what the external user suggests.
    // currentInternalState is the state, and action is action
    const resolveChangesReducer = (currentInternalState, action) => {
        // `internalReducer` here is the centralize store for states
        const internalChanges = internalReducer(currentInternalState, action)
        const userChanges = userReducer(currentInternalState, {
          ...action,
          internalChanges
        })
        return userChanges
    }

    // It’s worth mentioning that setExpanded returned from the 
    // `useReducer` call now works as a dispatcher
    // Reducer is just a function that receives "state" and "action" to return a new state.
    // the useReducer call for state updates
    const [{ expanded }, setExpanded] = useReducer(resolveChangesReducer, initialState)
    // 👆 Note how we destructured state variable, expanded

    // setExpanded is now a dispatcher. Toggle fn refactored 👇  
    const toggle = useCallback(
        // Every setExpanded call should be passed an object with a type
        () => setExpanded({ type: useExpanded.types.toggleExpand }),
        []
    )

    const override = useCallback(
        () => setExpanded({ type: useExpanded.types.override }),
        []
    )

    const resetRef = useRef(0)
    const reset = useCallback(
        () => {
            // perform actual reset 
            setExpanded({ 
                type: useExpanded.types.reset, 
                payload: initialExpanded // pass a payload "initialExpanded"
            })
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
            resetDep: resetRef.current,
            override
        }), 
        [expanded, toggle, getTogglerProps, reset, resetRef, override]
    )

  return value
}

useExpanded.types = {
    toggleExpand: 'EXPAND',
    reset: 'RESET',
    override: 'OVERRIDE'
}