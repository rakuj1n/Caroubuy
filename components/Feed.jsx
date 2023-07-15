'use client'

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";


export default function Feed() {

    const [pageCount,setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems,setCurrentItems] = useState([])
    const itemsPerPage = 6

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(items.length / itemsPerPage))
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    },[itemOffset,itemsPerPage])


    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="listing-card">
                
            </div>
            <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            />
        </>
    )
}