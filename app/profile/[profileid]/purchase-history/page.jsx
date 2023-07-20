'use client'

import { useSearchParams } from "next/navigation"
import { StateContext } from "@/components/Context"
import Feed from "@/components/Feed"
import ImageUpload from "@/components/ImageUpload"
import Loading from "@/components/Loading"
import { Back, receipt } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';
import toast, {Toaster} from 'react-hot-toast'
import Image from 'next/image'

export default function PurchaseHistory({params}) {

    const searchParams = useSearchParams()
    const success = searchParams.get('success')
    const [purchaseSuccess, setPurchaseSuccess] = useState(false)
    const [status,setStatus] = useState('loading')
    const router = useRouter()
    const {data:session} = useSession()
    const glob = useContext(StateContext)
    const [fetchListing,setFetchListing] = useState([])
    const [filter,setFilter] = useState([])
    const [receipts,setReceipts] = useState([])

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

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                console.log(params.profileid)
                const data = await request(`/api/users/${params.profileid}/receipt`)
                setReceipts(data)
                setStatus('success')
            } catch (err) {
                console.log(err)
            }
        }
        fetchReceipts()
    },[]) 

    // protect URL route on client side---------

    useEffect(() => {
        if (!glob.state.usermanual?._id && !session?.user) {
            router.push('/')
        }
      },[glob.state.usermanual?._id,session?.user])

    if (!glob.state.usermanual?._id && !session?.user) return <Loading />

    // protect URL route on client side---------

    if (status === 'loading') return <Loading />

    return (
        <div className="home-main">
        <Toaster />
          <div className="overall-page-container">
            <div className="receipt-container">
            {receipts.length > 0 ? (receipts?.map(item => {
                return (
                    <div className="receipt">
                        <div className="receipt-details">
                            <p><strong>Receipt Id: </strong>{item._id}</p>
                            <p><strong>Purchased on </strong>{item.createdAt.split('T')[0]} at {item.createdAt.split('T')[1].slice(0, -5)}</p>
                        </div>
                        <div className="purchased-items">
                            <strong>Items purchased:</strong>
                            {item.successPurchase?.map(item => {
                                return (
                                    <div className="purchased-item">
                                        <Image src={item.listingthumbnail} width={40} height={40}/>
                                        <Link href={`/listing/${item._id}`}><p>{item.listingname}</p></Link>
                                        <p>${item.listingprice}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })):
            <p>No purchases.</p>}
            </div>
          </div>
        </div>
    )
}