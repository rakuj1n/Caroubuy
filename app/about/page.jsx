'use client'

import { StateContext } from "@/components/Context"
import { useContext } from "react"

export default function About() {

    const user = useContext(StateContext)

    return (
        <> 
        {user}
        </>
    )
}