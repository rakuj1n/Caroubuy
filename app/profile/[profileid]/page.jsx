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
    return (
        <div className="home-main">
            <div className="overall-page-container">
                <div className="profile-detail-section">
                    <Image alt='profile-pic' src='' width={50} height={50}/>
                    <h2>profile username</h2>
                    <p>profile creation date</p>
                    <p>profile email</p>
                    <div className="profile-links">
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