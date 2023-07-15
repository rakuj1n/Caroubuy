import Image from 'next/image'
import { AddToBasket, Heart } from '@/utils/svg'

export default function ListingCard({item,usermanual,useroauth}) {


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
        // </div>

        // card design from https://uiverse.io/Sashank02/new-warthog-10 

        <div className="card">
            {(usermanual != item.seller.usermanual?._id || useroauth != item.seller.useroauth?._id) &&
            <>
                <div className='heart'><Heart/></div>
                <div className='addtobasket' onClick={()=>{console.log('itemid',item._id,'accid',usermanual,useroauth)}}><AddToBasket /></div>
            </>
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