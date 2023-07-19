'use client'

import { StateContext } from "@/components/Context"
import FeedOneRow from "@/components/FeedOneRow"
import ImageUpload from "@/components/ImageUpload"
import Loading from "@/components/Loading"
import { AddToBasket, FilledHeart, Heart } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function MyBasket() {

    const [status,setStatus] = useState('loading')
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

    //sendd a fetch of localstorage array
    //rmbr to filter out already bought on server side
    //send back fetch data with checks of if localstorage.length !== fetchdata.length, error msg "items alr bought, have been removed: show list of items removed"
    //set localstorage to the fetched back data list (bought items removed)
    //when press checkout, submit the localstorage cart to server
    //server check if item has been bought, using if listing.boughtby (?) !== null, do not update
    //server updates left over items boughtby, creates a receipt using receipt model, send back receipt data

    //add in bought text for listing card and remove addtobasket option if bought listing.boughtby !== null
    

    // if (status === 'loading') return <Loading />

    return (
        <div className="home-main">
            <div className="overall-page-container">
                
                <div className="profile-listing-feed">
                    <FeedOneRow data={account?.listings} usermanualaccount={glob.state.usermanual?.account} usermanual={glob.state.usermanual?._id} useroauthaccount={session?.user?.account} useroauth={session?.user.id}/>
                </div>
            </div>
        </div>
    )
}