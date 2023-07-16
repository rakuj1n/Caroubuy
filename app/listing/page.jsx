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
    const [filter,setFilter] = useState([])

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
        const fetchAllListing = async () => {
          const allListing = await request('/api/listing')
          setFetchListing(allListing)
        }
        fetchAllListing()
      },[])

      useEffect(() => {
        setFilter(fetchListing)
      },[fetchListing])

      function handleSearchChange(e) {
        const filtered = fetchListing.filter(item => item.listingname.includes(e.target.value))
        setFilter(filtered)
        if (e.target.value === '') setFilter(fetchListing)
      }

    return (
        <div className="home-main">
            <div className='searchinput' href='/'><input name='searchinput' onChange={handleSearchChange} placeholder="Search a listing"/></div>
            <div className="overall-page-container">
                <div className="content-container">
                    <Feed filter={filter} usermanual={glob.state.usermanual?._id} useroauth={session?.user.id} data={filter}/>
                </div>
            </div>
        </div>
    )
}