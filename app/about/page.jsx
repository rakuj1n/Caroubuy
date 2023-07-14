'use client'

import { StateContext } from "@/components/Context"
import { useContext } from "react"

export default function About() {

    const glob = useContext(StateContext)

    return (
        <> 
        {console.log(glob)}
        </>
    )
}