'use client'

import { useSearchParams } from "next/navigation"
import { StateContext } from "@/components/Context"
import Feed from "@/components/Feed"
import ImageUpload from "@/components/ImageUpload"
import Loading from "@/components/Loading"
import { Back } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';
import toast, {Toaster} from 'react-hot-toast'

export default function PurchaseHistory() {

    const searchParams = useSearchParams()
    const success = searchParams.get('success')
    const [purchaseSuccess, setPurchaseSuccess] = useState(false)
    const [status,setStatus] = useState('loading')
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

        if (success == 'true') {
            setPurchaseSuccess(true)
        }
      },[glob.state.usermanual?._id])

    useEffect(() => {
        if (purchaseSuccess) {
            toast.success("Purchase successful! A receipt has been saved in your purchase history.")
        }
    },[purchaseSuccess])

    return (
        <div>
            <Toaster />
            purchase history
            fetch receipts and map
        </div>
    )
}