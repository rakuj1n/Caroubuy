'use client'

import { StateContext } from "@/components/Context"
import { Back } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import Link from "next/link"
import { useContext, useEffect } from "react"

export default function CreateListing() {

    const glob = useContext(StateContext)

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

    return (
        <div className="home-main">
            <div className="overall-page-container">
                <Link className='back-above-content' href='/'><Back /></Link>
                <div className="content-container">
                    <form className="form-container-create-listing">
                        <h2>Create Your Listing</h2>
                        <input type='text' placeholder="Listing Name"/>
                        <input type='number' placeholder="Enter a price"/>
                        <textarea rows="5" cols="90" placeholder="Describe your listing"/>
                    </form>
                </div>
            </div>
        </div>
    )
}