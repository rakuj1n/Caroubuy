'use client'

import { SessionProvider } from "next-auth/react"
import { StateProvider } from "./Context"
import { ShoppingCartProvider } from "./ShoppingCartContext"

export default function Provider({ children, session }) {


    return (
        <SessionProvider session={session}>
            <StateProvider>
                <ShoppingCartProvider>
                {children}
                </ShoppingCartProvider>
            </StateProvider>
        </SessionProvider>
    )
}