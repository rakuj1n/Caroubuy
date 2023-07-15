'use client'

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ListingCard from "./ListingCard";


export default function Feed({data,usermanual,useroauth}) {

    const [pageCount,setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems,setCurrentItems] = useState([])
    const itemsPerPage = 6

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data?.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(data?.length / itemsPerPage))
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    },[itemOffset,itemsPerPage,data])

    console.log(data) 
    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data?.length;
        console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    }; 

    return (
        <div className="listing-overall">
            <div className="listing-container">
                {currentItems?.map((item,index) => 
                    <ListingCard key={index} item={item} usermanual={usermanual} useroauth={useroauth}/>
                )}
            </div>
            <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination-container"
            />
        </div>
    )
}