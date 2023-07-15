'use client'

import { StateContext } from "@/components/Context"
import Feed from "@/components/Feed"
import ImageUpload from "@/components/ImageUpload"
import { Back } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';

export default function Listing() {
    
    const router = useRouter()
    const {data:session} = useSession()
    const glob = useContext(StateContext)
    const [fetchListing,setFetchListing] = useState([])

    useEffect(() => {
        const loggedInManual = getUser()
        if (loggedInManual) {
          glob.setState(prev => ({...prev, usermanual: loggedInManual}))
        }
    
        const getImage = async (userid) => {
          const user = await request(`api/users/${userid}/image`)
          glob.setState(prev => ({...prev,userimage: user?.image}))
        }
        getImage(glob.state.usermanual?._id)
      },[glob.state.usermanual?._id])

      useEffect(() => {
        const fetchMyListing = async (userid,type) => {
            if (type == 'manual') {
                try {
                    const myListing = await request(`api/listing?usermanual=${userid}`)
                    setFetchListing(myListing)
                } catch (err) {
                    console.log(err)
                }
            } else {
                try {
                    const myListing = await request(`api/listing?useroauth=${userid}`)
                    setFetchListing(myListing)
                } catch (err) {
                    console.log(err)
                }
            }
        }
        if (glob.state.usermanual?._id) {
            fetchMyListing(glob.state.usermanual?._id,'manual')
        } else {
            fetchMyListing(session?.user.id)
        }
      },[glob.state.usermanual?._id,session?.user.id])

    return (
        <div className="home-main">
            <div className="overall-page-container">
                {/* <Link className='back-above-content' href='/'><Back /></Link> */}
                <div className="content-container">
                    <Feed data={fetchListing}/>
                </div>
            </div>
        </div>
    )
}