'use client'

import { useSession } from "next-auth/react"
import { useContext, useState } from "react"
import Image from 'next/image'
import { Browse, Mylist, Createlisting, Profile, Basket } from "@/utils/svg"
import { StateContext } from "./Context"


export default function Navbar() {
    const { data: session } = useSession()
    const glob = useContext(StateContext)

    return (
    <>
        {
        session?.user || glob.state.usermanual ? 

        <div className="navbar-container">
            <Browse />
            <Mylist />
            <Createlisting />
            <Basket />

            { 
            <Image className='profile-pic' alt='profile-pic' src={session?.user.image || glob.state.usermanual.image} width={50} height={50} /> ||
            <Profile />
            }
        </div> 

        :

        <div className="navbar-container">
            <Browse />
        </div>
        }
    </>
    )
}
