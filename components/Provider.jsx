'use client'

import { SessionProvider } from "next-auth/react"
import { StateProvider } from "./Context"

export default function Provider({ children, session }) {


    return (
        <StateProvider>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </StateProvider>
    )
}