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


export default function Profile({params}) {
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


    useEffect(() => {
      const fetchindivaccount = async () => {
        try {
            console.log('hello')
          const indivaccount = await request(`/api/profile/${params.profileid}`)
          setAccount(indivaccount)
          setStatus('success')
        } catch (err) {
          console.log(err)
        }
      }
      fetchindivaccount()
    },[params.profileid])

    if (status === 'loading') return <Loading />

    

    return (
        <div className="home-main">
            <div className="overall-page-container">
                <div className="profile-detail-section">

                    <Image alt='profile-pic' style={{borderRadius:'50%'}} src={account?.profile?.image} width={55} height={55}/>

                    <h2 style={{fontSize:'1.7rem'}}>{account?.profile?.usermanual?.username || account?.profile?.useroauth?.username }</h2>
                    <p>Account created on {account?.profile?.createdAt.split("T")[0]}</p>
                    <p>Contact: {account?.profile?.usermanual?.email || account?.profile?.useroauth?.email}</p>
                    { (params.profileid === glob.state.usermanual?.account || params.profileid === session?.user?.account) &&
                      <div className="user-links">
                        {!session?.user?.account && <Link href={`/profile/${params.profileid}/settings`}>Change my settings</Link>}
                        <Link href={`/profile/${params.profileid}/myfavs`}>My Favourites</Link>
                        <Link href={`/profile/${params.profileid}/purchase-history`}>My Purchase History</Link>
                    </div>}
                </div>
                <div className="profile-listing-feed">
                    <FeedOneRow data={account?.listings} usermanualaccount={glob.state.usermanual?.account} usermanual={glob.state.usermanual?._id} useroauthaccount={session?.user?.account} useroauth={session?.user.id}/>
                </div>
            </div>
        </div>
    )
}