'use client'

import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}) {
    const [cartItems,setCartItems] = useLocalStorage("shopping-cart",[])

    function getCart() {
        return cartItems
    }

    function getTotalQty() {
        return cartItems.length
    }

    function addItem(id) {
        setCartItems(prev => {
            if (prev.find(item => item === id) == null) {
                return [...prev, id]
            }
        })
    }

    function removeItem(id) {
        setCartItems(prev => {
            return prev.filter(item => item !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{getCart, getTotalQty,addItem,removeItem}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}