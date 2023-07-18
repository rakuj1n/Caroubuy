'use client'

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ListingCard from "./ListingCard";


export default function Feed({data,usermanual,useroauth,filter,useroauthaccount,usermanualaccount}) {

    // Smaller screen----------------

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isSmallScreenQuery = window.matchMedia('(max-height: 950px)')
            setIsSmallScreen(isSmallScreenQuery.matches)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        setItemOffset(0)
    },[isSmallScreen])

    // Smaller screen----------------

    const [pageCount,setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems,setCurrentItems] = useState([])
    const itemsPerPage = isSmallScreen ? 3 : 6

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data?.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(data?.length / itemsPerPage))
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    },[itemOffset,itemsPerPage,data])

    console.log(usermanual,useroauth,useroauthaccount,usermanualaccount) 
    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data?.length;
        console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    }; 

    useEffect(() => {
        setItemOffset(0)
    },[filter]) //try to reset this back to a submit and fetch style

    return (
        <div className="listing-overall">
            <div className="listing-container">
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
            />
        </div>
    )
}