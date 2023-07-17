'use client'

import { useSession } from "next-auth/react"
import { useContext, useState } from "react"
import Image from 'next/image'
import { Browse, Mylist, Createlisting, Profile, Basket } from "@/utils/svg"
import { StateContext } from "./Context"
import Link from "next/link"


export default function Navbar() {
    const { data: session } = useSession()
    const glob = useContext(StateContext)

    return (
    <>
        {
        session?.user || glob.state.usermanual ? 

        <div className="navbar-container">
            <Link href='/listing'><Browse /></Link>
            <Link href='/mylisting'><Mylist /></Link>
            <Link href='/create-listing'><Createlisting /></Link>
            <Basket />

            <Link href={`/profile/${1}`}>{ // update this to the correct variable
            <Image className='profile-pic' alt='profile-pic' src={session?.user.image || glob.state?.userimage } width={50} height={50} /> ||
            <Profile />
            }</Link>
        </div> 

        :

        <div className="navbar-container">
            <Link href='/listing'><Browse /></Link>
        </div>
        }
    </>
    )
}
