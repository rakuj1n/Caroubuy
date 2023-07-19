'use client'

import { StateContext } from "@/components/Context"
import FeedOneRow from "@/components/FeedOneRow"
import ImageUpload from "@/components/ImageUpload"
import Loading from "@/components/Loading"
import { useShoppingCart } from "@/components/ShoppingCartContext"
import { AddToBasket, FilledHeart, Heart } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import toast, {Toaster} from 'react-hot-toast'

export default function MyBasket() {

    const [status,setStatus] = useState('loading')
    const [submitting,setSubmitting] = useState(false)
    const router = useRouter()
    const {data:session} = useSession()
    const glob = useContext(StateContext)
    const [account,setAccount] = useState({})
    const [checkOut,setCheckOut] = useState({})
    const [totalAmt,setTotalAmt] = useState('')

  // ShoppingContext--------------------------

  const { setCartManual,fetchCartItems,getCart,getTotalQty,addItem,removeItem } = useShoppingCart()

  // ShoppingContext--------------------------

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

        const fetchCart = async () => {
          let data = await request(`/api/users/${glob.state.usermanual?.account || session?.user?.account}/checkout`,"GET")
          //---CHECKS---
          let filterOutBought = data?.cart.filter(item => !item.buyer)
          let alreadyBought = data?.cart.filter(item => item.buyer)
          //---CHECKS---
          if (alreadyBought?.length > 0) {
            toast.error(
              `The following items have already been bought and are removed from your cart:
              ${alreadyBought.map(item => item._id)}`
              )
          }
          console.log('hi',data,filterOutBought,alreadyBought)
          // manually set cart items in local storage to filteredBought array
          setCheckOut(data)
          setCartManual(filterOutBought?.map(item => item._id))
          setStatus('success')
        }
        fetchCart()
      },[glob.state.usermanual?._id,session?.user?.account])

      useEffect(() => {
        const price = async () =>{
          let data = await request(`/api/users/${glob.state.usermanual?.account || session?.user?.account}/checkout`,"GET")
            //---CHECKS---
            let filterOutBought = data?.cart.filter(item => !item.buyer)
           // add prices
           setTotalAmt(filterOutBought?.map(item => item.listingprice)?.reduce((acc,curr) => parseInt(acc) + parseInt(curr),0))
        }
        price()
      },[getCart()])

    //when press checkout, submit the localstorage cart to server
    async function handleCheckOut(e) {
      e.preventDefault()
      setSubmitting(true)
      try {
        let sendData = getCart()
        let data = await request(`/api/users/${glob.state.usermanual?.account || session?.user?.account}/checkout`,"POST",sendData)
        setStatus('loading')
        setCartManual([])
        router.push(`/profile/${glob.state.usermanual?.account || session?.user?.account}/purchase-history?success=true`)
      } catch (err) {
        console.log(err)
      } finally {
        setSubmitting(false)
      }
    } 

    if (status === 'loading') return <Loading />

    return (
        <div className="home-main">
          <Toaster />
            <div className="overall-page-container">
              <div style={{display:'flex', gap:'50px', justifyContent:'center',alignItems:'center'}}>
                <div>Total Quantity: <strong>{getTotalQty()}</strong></div>
                <div>Total Amount: <strong>${totalAmt}</strong></div>
                {(getTotalQty() > 0) && <button onClick={handleCheckOut} disabled={submitting} className='checkout-button'>Checkout</button>}
              </div>
                <div className="profile-listing-feed">
                    <FeedOneRow data={checkOut?.cart?.filter(item => !item.buyer)} usermanualaccount={glob.state.usermanual?.account} usermanual={glob.state.usermanual?._id} useroauthaccount={session?.user?.account} useroauth={session?.user.id}/>
                </div>
            </div>
        </div>
    )
}