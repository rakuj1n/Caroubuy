'use client'

import Image from 'next/image'
import { AddToBasket, Heart, FilledHeart, AddToBasketGreen } from '@/utils/svg'
import { useRouter } from 'next/navigation'
import { request } from '@/utils/tokenAndFetch'
import { useEffect, useState } from 'react'
import { useShoppingCart } from './ShoppingCartContext'

export default function ListingCard({item,usermanual,useroauth,usermanualaccount,useroauthaccount,key}) {

    const router = useRouter()
    
    // ShoppingContext--------------------------
    
    const { getFavArr,addFav,removeFav,getCart,getTotalQty,addItem,removeItem } = useShoppingCart()
    const cart = getCart()
    const fav = getFavArr()
    
    // ShoppingContext--------------------------


    function handleGoToListing(listingId) {
        router.push(`/listing/${listingId}`)
    }

    async function handleAddToFav(listingId) {
        if (usermanual) {
            try {
                addFav(listingId)
                await request(`/api/users/${usermanual}/fav`,"PATCH",{
                    listingId
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                addFav(listingId)
                await request(`/api/users/${useroauth}/fav`,"PATCH",{
                    listingId
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    async function handleDeleteFromFav(listingId) {
        if (usermanual) {
            try {
                removeFav(listingId)
                await request(`/api/users/${usermanual}/fav`,"DELETE",{
                    listingId
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                removeFav(listingId)
                await request(`/api/users/${useroauth}/fav`,"DELETE",{
                    listingId
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    function handleHeartClick(e,itemid) {
        e.stopPropagation()
        if (fav?.includes(item._id)) {
            return handleDeleteFromFav(itemid)
        } else {
            return handleAddToFav(itemid)
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

    return (
        <div className="card" key={key} onClick={() => handleGoToListing(item._id)}>
            {item.buyer && <p className="sold-text sold">Sold</p>}
            {(!(usermanual || useroauth)) ?
            <></>
            : (usermanual != item.seller?.usermanual?._id || useroauth != item.seller?.useroauth?._id) ? 
            <>
                <div className='heart' onClick={(e) => handleHeartClick(e,item._id)}>
                { fav.includes(item._id) ? <FilledHeart/> : <Heart/> }
                </div>

                {(!item.buyer) &&
                <div className='addtobasket' onClick={(e) => handleBasket(e,item._id)}>
                    {(cart.includes(item._id)) ? <AddToBasketGreen /> : <AddToBasket />}
                </div>
                }
            </> 
            :
            <></>
            }

            <div className="card-image"><Image style={{ objectFit:'cover', borderRadius:'15px'}} 
                    alt='thumbnail' src={item.listingthumbnail} fill /></div>
            <p className="card-title">{item.listingname}</p>
            <p className="card-body">
                {item.listingdescription}
            </p>
            <p className="footer">Listed by <span className="by-name">{item.seller?.usermanual?.username || item.seller?.useroauth?.username}</span> at <span className="date">${item.listingprice}</span></p>
        </div>
    )
}

{/* <div className='addtobasket' onClick={(e)=>{e.stopPropagation();console.log('itemid',item._id,'accid',usermanual,useroauth)}}><AddToBasket /></div> */}



// (item.favby.includes(useroauthaccount) || item.favby.includes(usermanualaccount)) ? 
// <div className='heart' onClick={(e) => handleDeleteFromFav(e,item._id)}><FilledHeart/></div> 
// : 
// <div className='heart' onClick={(e) => handleAddToFav(e,item._id)}><Heart/></div>

        // <div className='listing-card'>
        //     <div className='heart'><Heart/></div>
        //     <div className='listing-content'>
        //         <div className='image-container'>
                    // <Image style={{ aspectRatio:'1/1', objectFit:'cover', borderRadius:'15px'}} 
                    // alt='thumbnail' src={item.listingthumbnail} width={190} height={190} />
        //         </div>
        //         <div className='text-content'>
        //             <div className='text-content-inner'>
        //                 <h2>{item.listingname}</h2>
        //                 <p>{item.listingdescription}</p>
        //                 <p className='pricee'>{item.listingprice}</p>
        //             </div>
        //             <div className='seller-container'>
        //                 <p>Sold by {item.seller.usermanual?.username || item.seller.useroauth?.username}</p>
        //             </div>
        //         </div>
        //     </div> 
        // </div> ((usermanual || useroauth) || (usermanual != item.seller.usermanual?._id || useroauth != item.seller.useroauth?._id))

        // card design from https://uiverse.io/Sashank02/new-warthog-10 