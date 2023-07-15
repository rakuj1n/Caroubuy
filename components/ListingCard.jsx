import Image from 'next/image'
import { Heart } from '@/utils/svg'

export default function ListingCard({item}) {


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

        <div class="card">
        <div class="card-image"><Image style={{ objectFit:'cover', borderRadius:'15px'}} 
                    alt='thumbnail' src={item.listingthumbnail} fill /></div>
        <p class="card-title">{item.listingname}</p>
        <p class="card-body">
            {item.listingdescription}
        </p>
        <p class="footer">Sold by <span class="by-name">{item.seller.usermanual?.username || item.seller.useroauth?.username}</span> at <span class="date">${item.listingprice}</span></p>
        </div>


    )
}