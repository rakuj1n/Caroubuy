'use client'

import { SessionProvider } from "next-auth/react"
import { StateProvider } from "./Context"

export default function Provider({ children, session }) {


    return (
        <SessionProvider session={session}>
            <StateProvider>
                {children}
            </StateProvider>
        </SessionProvider>
    )
}