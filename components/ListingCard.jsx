'use client'

import Image from 'next/image'
import { AddToBasket, Heart, FilledHeart } from '@/utils/svg'
import { useRouter } from 'next/navigation'
import { request } from '@/utils/tokenAndFetch'
import { useState } from 'react'

export default function ListingCard({item,usermanual,useroauth}) {

    const router = useRouter()
    const [favByUser,setFavByUser] = useState(null)

    function handleGoToListing(listingId) {
        router.push(`/listing/${listingId}`)
    }

    async function handleAddToFav(e,listingId) {
        e.stopPropagation()

        if (usermanual) {
            try {
                await request(`/api/users/${usermanual}/fav`,"PATCH",{
                    listingId
                })
                console.log('req done')
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                await request(`/api/users/${useroauth}/fav`,"PATCH",{
                    listingId
                })
                console.log('req done oauth')
            } catch (err) {
                console.log(err)
            }
        }
    }

    console.log(item.favby,usermanual,useroauth,item.favby == usermanual, item.favby == useroauth)

    return (
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


        <div className="card" onClick={() => handleGoToListing(item._id)}>
            {(!(usermanual || useroauth)) ?
            <>
            </>
            : (usermanual != item.seller.usermanual?._id || useroauth != item.seller.useroauth?._id) ? 
            <>
                {true ? <div className='heart' onClick={(e) => handleAddToFav(e,item._id)}><Heart/></div> : <div className='heart' onClick={(e) => handleAddToFav(e,item._id)}><FilledHeart/></div>}
                <div className='addtobasket' onClick={(e)=>{e.stopPropagation();console.log('itemid',item._id,'accid',usermanual,useroauth)}}><AddToBasket /></div>
            </> :
            <></>
            }

            <div className="card-image"><Image style={{ objectFit:'cover', borderRadius:'15px'}} 
                    alt='thumbnail' src={item.listingthumbnail} fill /></div>
            <p className="card-title">{item.listingname}</p>
            <p className="card-body">
                {item.listingdescription}
            </p>
            <p className="footer">Sold by <span className="by-name">{item.seller.usermanual?.username || item.seller.useroauth?.username}</span> at <span className="date">${item.listingprice}</span></p>
        </div>


    )
}