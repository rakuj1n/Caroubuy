'use client'

import { request } from "@/utils/tokenAndFetch"
import { useEffect, useState } from "react"
import Image from 'next/image'


export default function Dashboard() {

    const [allData, setAllData] = useState({})
    const [currSelected, setCurrSelected] = useState('listings') //listings, receipts

    useEffect(() => {
        const fetchAllDataAdmin = async () => {
            try {
                const allData = await request('/api/admin',"GET")
                setAllData(allData)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllDataAdmin()
    },[])

    return (
        <div className="home-main">
            <div className="select-type">
                <p style={{color:currSelected==='listings'? 'white':''}} onClick={() => setCurrSelected('listings')}>Listings</p>
                <p style={{color:currSelected==='receipts'? 'white':''}} onClick={() => setCurrSelected('receipts')}>Receipts</p>
            </div>
            <div className="overall-page-container">
                <div className="receipt-container">
                    <div className="all-listings" style={{display:'flex',gap:'10px',flexDirection:'column'}}>
                        <h2 style={{fontSize:'1.5rem'}}>All {currSelected==='listings' ? 'listings' : 'receipts'}:</h2>
                        {currSelected === 'listings' &&
                        allData?.listing?.map(item => {
                            return (
                                <div style={{padding:'20px',backgroundColor:'#c9d6ff61',borderRadius:'20px'}}>
                                    <Image alt='thumbnail' src={item.listingthumbnail} height={30} width={30}/>
                                    <div>{item.listingname}</div>
                                    <div>Item id: {item._id}</div>
                                    <div>{item.listingdescription}</div>
                                    <div>${item.listingprice}</div>
                                    <div>Listed on {item.createdAt}</div>
                                    <div>Buyer: {item.buyer}</div>
                                    <div>Seller: {item.seller._id}</div>
                                    <div>Favourited by: {item.favby.join(', ')}</div>
                                </div>
                            )
                        })}

                        {currSelected === 'receipts' &&
                        allData?.receipt?.map(item => {
                            return (
                                <div style={{padding:'20px',backgroundColor:'#c9d6ff61',borderRadius:'20px'}}>
                                    <div>Receipt Id: {item._id}</div>
                                    <div>Receipt date: {item.createdAt}</div>
                                    <div>Receipt owner: {item.account}</div>
                                    <div>Purchased items: {item.successPurchase.join(', ')}</div>
                                    <div>Error items: {item.errorPurchase.join(', ')}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}