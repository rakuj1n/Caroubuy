'use client'

import { StateContext } from "@/components/Context"
import ImageUpload from "@/components/ImageUpload"
import { AddToBasket, FilledHeart, Heart } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


export default function Profile({params}) {
    const [submitting,setSubmitting] = useState(false)
    const router = useRouter()
    const {data:session} = useSession()
    const glob = useContext(StateContext)
    const [account,setAccount] = useState({})

    useEffect(() => {
        const loggedInManual = getUser()
        if (loggedInManual) {
          glob.setState(prev => ({...prev, usermanual: loggedInManual}))
        }
    
        const getImage = async (userid) => {
          const user = await request(`/api/users/${userid}/image`)
          glob.setState(prev => ({...prev,userimage: user?.image}))
        }
        getImage(glob.state.usermanual?._id)
      },[glob.state.usermanual?._id])


    useEffect(() => {
      const fetchindivaccount = async () => {
        try {
            console.log('hello')
          const indivaccount = await request(`/api/profile/${params.profileid}`)
          console.log(indivaccount)
          setAccount(indivaccount)
        } catch (err) {
          console.log(err)
        }
      }
      fetchindivaccount()
    },[params.profileid])

//  (glob.state.usermanual?._id != indivListing.seller.usermanual?._id || session?.user?.id != indivListing.seller.useroauth?._id) ? 
console.log(account)

//code the situation for when user has no listings, if (account[0]) else...
    return (
        <div className="home-main">
            <div className="overall-page-container">
                <div className="profile-detail-section">
                    <Image alt='profile-pic' style={{borderRadius:'50%'}} src={account[0]?.seller.image} width={55} height={55}/>
                    <h2 style={{fontSize:'1.7rem'}}>{account[0]?.seller.usermanual.username || account[0]?.seller.useroauth.username}</h2>
                    <p>Account created on {account[0]?.seller.createdAt.split("T")[0]}</p>
                    <p>Contact: {account[0]?.seller.usermanual.email || account[0]?.seller.useroauth.email}</p>
                    <div className="user-links">
                        <Link href='/'><small>Change my password</small></Link>
                        <Link href='/'>My Favourites</Link>
                        <Link href='/'>My Purchase History</Link>
                    </div>
                </div>
                <div className="profile-listing-feed">
                    feed goes here
                </div>
            </div>
        </div>
    )
}