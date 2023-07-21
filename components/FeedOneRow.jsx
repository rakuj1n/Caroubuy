'use client'

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ListingCard from "./ListingCard";


export default function FeedOneRow({data,usermanual,useroauth,filter,useroauthaccount,usermanualaccount}) {

    const [pageCount,setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems,setCurrentItems] = useState([])
    const itemsPerPage = 3

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data?.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(data?.length / itemsPerPage))
    },[itemOffset,itemsPerPage,data])
    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data?.length;
        setItemOffset(newOffset);
    }; 

    useEffect(() => {
        setItemOffset(0)
    },[filter])

    return (
        <div className="listing-overall">
            <div className="listing-container-one-row">
                {currentItems?.map((item,index) => 
                    <ListingCard key={index} item={item} usermanualaccount={usermanualaccount} usermanual={usermanual} useroauthaccount={useroauthaccount} useroauth={useroauth}/>
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
            activeClassName="active"
            previousLinkClassName="previous"
            nextLinkClassName="next"
            pageLinkClassName="page"
            />
        </div>
    )
}