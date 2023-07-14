'use client'

import { getUser } from "@/utils/tokenAndFetch"
import { createContext, useState } from "react"
import { useContext } from "react"
import { useSession } from "next-auth/react"

export const StateContext = createContext()

export const StateProvider = ({children}) => {

    const { data:session } = useSession()

    const [state, setState] = useState({
        usermanual:null,
        useroauth:session,
    })

    return (
    <StateContext.Provider value={{state, setState}}>
        {children}
    </StateContext.Provider>
    )
}

export const useStateProvider = () => useContext(StateContext)