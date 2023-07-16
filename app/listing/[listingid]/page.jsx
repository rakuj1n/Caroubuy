'use client'

import { StateContext } from "@/components/Context"
import ImageUpload from "@/components/ImageUpload"
import { getUser, request } from "@/utils/tokenAndFetch"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


export default function CreateListing({params}) {
    const [submitting,setSubmitting] = useState(false)
    const router = useRouter()
    const {data:session} = useSession()
    const glob = useContext(StateContext)
    const [indivListing,setIndivListing] = useState({})

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
      const fetchindivlisting = async () => {
        try {
          const indivlisting = await request(`/api/listing/${params.listingid}`)
          setIndivListing(indivlisting)
        } catch (err) {
          console.log(err)
        }
      }
      fetchindivlisting()
    },[params.listingid])

    async function handleDelete(listingid) {
      try {
        await request(`/api/listing/${listingid}`,"DELETE")
      } catch (err) {
        console.log(err)
      }
      router.push('/mylisting')
    }

    return (
        <div className="home-main">
            <div className="overall-page-container">
                {/* <Link className='back-above-content' href='/'><Back /></Link> */}
                <div className="content-container">
                    <div><Image src={indivListing.listingthumbnail} height={200} width={200} /></div>
                    <p className="listingname">{indivListing.listingname}</p>
                    <p>Listed by <strong>{indivListing.seller?.usermanual?.username || indivListing.seller?.useroauth?.username}</strong> on {indivListing.createdAt?.split("T")[0]}</p>
                    <p><em>${indivListing.listingprice}</em></p>
                    <p>{indivListing.listingdescription}</p>
                    {(glob.state.usermanual?._id && (glob.state.usermanual?._id == indivListing.seller?.usermanual?._id)) ? 
                    <button onClick={() => handleDelete(indivListing._id)}>Delete Listing</button>
                    : (session?.user?.id && (session?.user?.id == indivListing.seller?.useroauth?._id)) ?
                    <button onClick={() => handleDelete(indivListing._id)}>Delete Listing</button> : <></>
                    }
                </div>
            </div>
        </div>
    )
}