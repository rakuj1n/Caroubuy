'use client'

import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useSession } from "next-auth/react";
import { StateContext } from "./Context";
import { request } from "@/utils/tokenAndFetch";

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}) {
    const {data:session} = useSession()
    const glob = useContext(StateContext)
    const [cartItems,setCartItems] = useLocalStorage("shopping-cart",[])
    const [totalAmt,setTotalAmt] = useLocalStorage("total-amt",0)

    // glob.state.usermanual?.account || session?.user?.account

    function setCartManual(itemsArr,total) {
        setCartItems(itemsArr)
        setTotalAmt(total)
    }

    async function fetchCartItems() {
        let res = await request(`/api/users/${glob.state.usermanual?.account || session?.user?.account}/cart`,"GET")
        setCartItems(res?.cart || [])
        setTotalAmt(res?.total || 0)
    }

    function getCart() {
        return cartItems
    }

    function getTotalQty() {
        return cartItems?.length
    }

    async function addItem(id) {
        setCartItems(prev => {
            if (prev.find(item => item === id) == null) {
                return [...prev, id]
            }
        })
        let res = await request(`/api/users/${glob.state.usermanual?.account || session?.user?.account}/cart`,'POST',{id})
        setTotalAmt(prev => parseInt(prev) + parseInt(res.listingprice))
    }

    async function removeItem(id) {
        setCartItems(prev => {
            return prev.filter(item => item !== id)
        })
        let res = await request(`/api/users/${glob.state.usermanual?.account || session?.user?.account}/cart`,'DELETE',{id})
        setTotalAmt(prev => parseInt(prev) - parseInt(res.listingprice))        
    }

    function getTotalAmt() {
        return totalAmt
    }

    return (
        <ShoppingCartContext.Provider value={{getTotalAmt,setCartManual,fetchCartItems,getCart, getTotalQty,addItem,removeItem}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}