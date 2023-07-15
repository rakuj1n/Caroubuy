import Image from 'next/image'
import { Heart } from '@/utils/svg'

export default function ListingCard({item}) {


    return (
        <div className='listing-card'>
            <div className='heart'><Heart/></div>
            <div className='listing-content'>
                <div className='image-container'>
                    <Image style={{width:'100%', aspectRatio:'1/1', objectFit:'cover'}} alt='thumbnail' src={item.listingthumbnail} width={150} height={150} />
                </div>
                <div className='text-content'>
                    <div className='text-content-inner'>
                        <h2>{item.listingname}</h2>
                        <p>{item.listingdescription}</p>
                        <p className='price'>{item.listingprice}</p>
                    </div>
                    <div className='seller-container'>
                        <p>Sold by {item.seller}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}