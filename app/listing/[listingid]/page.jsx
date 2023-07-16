'use client'

import { StateContext } from "@/components/Context"
import ImageUpload from "@/components/ImageUpload"
import { getUser, request } from "@/utils/tokenAndFetch"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


export default function CreateListing({params}) {
    const [submitting,setSubmitting] = useState(false)
    const router = useRouter()
    const {data:session} = useSession()
    const glob = useContext(StateContext)

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

    return (
        <div className="home-main">
            <div className="overall-page-container">
                {/* <Link className='back-above-content' href='/'><Back /></Link> */}
                <div className="content-container">
                    {params.listingid}
                </div>
            </div>
        </div>
    )
}