import { createContext, useContext, useState } from "react";

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}) {
    const [cartItems,setCartItems] = useState([])

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