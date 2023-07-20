'use client'

import { StateContext } from "@/components/Context"
import ImageUpload from "@/components/ImageUpload"
import Loading from "@/components/Loading"
import { useShoppingCart } from "@/components/ShoppingCartContext"
import { AddToBasket, AddToBasketGreen, FilledHeart, Heart } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


export default function IndividualListing({params}) {
    const [status,setStatus] = useState('loading')
    const [submitting,setSubmitting] = useState(false)
    const router = useRouter()
    const {data:session} = useSession()
    const glob = useContext(StateContext)
    const [indivListing,setIndivListing] = useState({})
    const [isFav, setIsFav] = useState(false)

    // ShoppingContext--------------------------

    const { getCart,getTotalQty,addItem,removeItem } = useShoppingCart()
    const cart = getCart()

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
      },[glob.state.usermanual?._id])


    useEffect(() => {
      const fetchindivlisting = async () => {
        try {
          setStatus('loading')
          const indivlisting = await request(`/api/listing/${params.listingid}`)
          setIndivListing(indivlisting)
          setStatus('success')
        } catch (err) {
          console.log(err)
        }
      }
      fetchindivlisting()
    },[params.listingid])

    useEffect(() => {
      setIsFav((indivListing.favby?.includes(glob.state.usermanual?.account) || indivListing.favby?.includes(session?.user.account)) ? true : false)
    },[indivListing])

    async function handleDelete(listingid) {
      try {
        await request(`/api/listing/${listingid}`,"DELETE")
      } catch (err) {
        console.log(err)
      }
      router.push('/mylisting')
    }

    function handleHeartClick(e,itemid) {
      e.stopPropagation()
      if (isFav) {
          setIsFav(prev => !prev)
          return handleDeleteFromFav(itemid)
      } else {
          setIsFav(prev => !prev)
          return handleAddToFav(itemid)
      }
  }

  async function handleAddToFav(listingId) {
    if (glob.state.usermanual?.account) {
        try {
            await request(`/api/users/${glob.state.usermanual?._id}/fav`,"PATCH",{
                listingId
            })
            console.log('req done')
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            await request(`/api/users/${session?.user?.id}/fav`,"PATCH",{
                listingId
            })
            console.log('req done oauth')
        } catch (err) {
            console.log(err)
        }
    }
}

async function handleDeleteFromFav(listingId) {
    if (glob.state.usermanual?.account) {
        try {
            await request(`/api/users/${glob.state.usermanual?._id}/fav`,"DELETE",{
                listingId
            })
            console.log('DELETE done')
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            await request(`/api/users/${session?.user?.id}/fav`,"DELETE",{
                listingId
            })
            console.log('DELETE done oauth')
        } catch (err) {
            console.log(err)
        }
    }
}

function handleBasket(e,itemid) {
  e.stopPropagation()
  if (cart.includes(itemid)) {
    removeItem(itemid)
  } else {
      addItem(itemid)
  }
}

  if (status === 'loading') return <Loading />

    return (
        <div className="home-main">
            <div className="overall-page-container">
                {/* <Link className='back-above-content' href='/'><Back /></Link> */}
                <div className="content-container indiv slidedown">
                    <div><img alt='thumbnail' src={indivListing.listingthumbnail} height={200} width={200} /></div>
                    <p className="listingname">{indivListing.listingname}</p>
                    <p>Listed by <Link href={`/profile/${indivListing.seller?._id}`}><strong className="seller-name">{indivListing.seller?.usermanual?.username || indivListing.seller?.useroauth?.username}</strong></Link> on {indivListing.createdAt?.split("T")[0]}</p>
                    
                    {(!(glob.state.usermanual?._id || session?.user?.id)) ?
                    <></> 
                    : (glob.state.usermanual?._id != indivListing.seller?.usermanual?._id || session?.user?.id != indivListing.seller?.useroauth?._id) ? 
                      <div className="clickables-in-indiv">
                        <div className='heart-in-indiv' onClick={(e) => handleHeartClick(e,indivListing._id)}>
                        { isFav ? <FilledHeart/> : <Heart/> }
                        </div>
                        { (!indivListing.buyer) &&
                          <div className='basket-in-indiv' onClick={(e) => handleBasket(e,indivListing._id)}>
                            {(cart.includes(indivListing._id)) ? <AddToBasketGreen /> : <AddToBasket />}
                          </div>
                        }
                      </div>
                      :
                      <></>
                    }
                    
                    <p><em>${indivListing.listingprice}</em></p>
                    <p>{indivListing.listingdescription}</p>
                    {indivListing.buyer && <p className="sold-text">Sold</p>}
                    {(glob.state.usermanual?._id && (glob.state.usermanual?._id == indivListing.seller?.usermanual?._id) && !indivListing.buyer) ? 
                    <button onClick={() => handleDelete(indivListing._id)}>Delete Listing</button>
                    : (session?.user?.id && (session?.user?.id == indivListing.seller?.useroauth?._id) && !indivListing.buyer) ?
                    <button onClick={() => handleDelete(indivListing._id)}>Delete Listing</button> : <></>
                    }
                </div>
            </div>
        </div>
    )
}