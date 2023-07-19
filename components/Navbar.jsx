'use client'

import { useSession } from "next-auth/react"
import { useContext, useState } from "react"
import Image from 'next/image'
import { Browse, Mylist, Createlisting, Profile, Basket } from "@/utils/svg"
import { StateContext } from "./Context"
import Link from "next/link"
import { useShoppingCart } from "./ShoppingCartContext"


export default function Navbar() {
    const { data: session } = useSession()
    const glob = useContext(StateContext)

    // ShoppingContext--------------------------

    const { getTotalQty } = useShoppingCart()
    const quantity = getTotalQty()

    // ShoppingContext--------------------------

    return (
    <>
        {
        session?.user || glob.state.usermanual ? 

        <div className="navbar-container">
            <Link href='/listing'><Browse /></Link>
            <Link href='/mylisting'><Mylist /></Link>
            <Link href='/create-listing'><Createlisting /></Link>

            <Link href='/mybasket'>
                <div className="basket-container">
                    <Basket />
                    {quantity ? <div className="basketqty"><p>{quantity}</p></div> : <></> }
                </div>
            </Link>

            <Link href={`/profile/${session?.user?.account || glob.state?.usermanual?.account}`}>{ 
            <Image className='profile-pic profile-pic-nav' alt='profile-pic' src={session?.user.image || glob.state?.userimage } width={50} height={50} /> ||
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
