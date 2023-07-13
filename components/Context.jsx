'use client'

import { createContext, useState } from "react"
import { useContext } from "react"

export const StateContext = createContext()

export const StateProvider = ({children}) => {
    const [state, setState] = useState({})

    return (
    <StateContext.Provider value={state}>
        {children}
    </StateContext.Provider>
    )
}

export const useStateProvider = () => useContext(StateContext)