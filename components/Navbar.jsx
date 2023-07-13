'use client'

import { useSession } from "next-auth/react"
import { useState } from "react"
import Image from 'next/image'
import { Browse, Mylist, Createlisting, Profile, Basket } from "@/utils/svg"


export default function Navbar() {
    const { data: session } = useSession()

    return (
    <>
        {
        session?.user ? 

        <div className="navbar-container">
            <Browse />
            <Mylist />
            <Createlisting />
            <Basket />

            { 
            <Image className='profile-pic' alt='profile-pic' src={session?.user.image} width={50} height={50} /> ||
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
