'use client'

import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useSession } from "next-auth/react";
import { StateContext } from "./Context";
import { request } from "@/utils/tokenAndFetch";
import toast from 'react-hot-toast'

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}) {
    const {data:session} = useSession()
    const glob = useContext(StateContext)
    const [cartItems,setCartItems] = useLocalStorage("shopping-cart",[])
    const [totalAmt,setTotalAmt] = useLocalStorage("total-amt",0)
    const [favArr,setFavArr] = useLocalStorage("favArr",[])

    // glob.state.usermanual?.account || session?.user?.account

    function setCartManual(itemsArr,total) {
        setCartItems(itemsArr)
        setTotalAmt(total)
    }

    function fetchCartItems() {
        const cart = async () => {
            let res = await request(`/api/users/${glob.state.usermanual?.account || session?.user?.account}/cart`,"GET")
            setCartItems(res?.cart || [])
            setTotalAmt(res?.total || 0)
        }
        const fav = async () => {
            let res2 = await request(`/api/users/${glob.state.usermanual?.account || session?.user?.account}/fav`,"GET")
            let favsArr = res2?.map(item => item._id)
            setFavArr(favsArr || [])
        }
        cart()
        fav()
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
        toast.success('Listing added to cart.')
    }

    async function removeItem(id) {
        setCartItems(prev => {
            return prev.filter(item => item !== id)
        })
        let res = await request(`/api/users/${glob.state.usermanual?.account || session?.user?.account}/cart`,'DELETE',{id})
        setTotalAmt(prev => parseInt(prev) - parseInt(res.listingprice))
        toast.success('Listing removed from cart.')        
    }

    function getTotalAmt() {
        return totalAmt
    }

    function getFavArr() {
        return favArr
    }

    function addFav(id) {
        setFavArr(prev => {
            if (prev.find(item => item === id) == null) {
                return [...prev,id]
            }
        })
        toast.success('Listing added to favourites.')
    }

    function removeFav(id) {
        setFavArr(prev => {
            return prev.filter(item => item !== id)
        })
        toast.success('Listing removed from favourites.')
    }
 
    return (
        <ShoppingCartContext.Provider value={{getFavArr,addFav,removeFav,getTotalAmt,setCartManual,fetchCartItems,getCart, getTotalQty,addItem,removeItem}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}