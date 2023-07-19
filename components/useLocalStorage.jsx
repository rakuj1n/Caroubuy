'use client'

import { useEffect, useState } from "react"

export function useLocalStorage(key, initialValue) {
    const [value,setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    },[key,value])

    // -------------------

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
          const storedValue = localStorage.getItem(key)
          setValue(storedValue ? JSON.parse(storedValue) : initialValue)
        }
      }, []);
    
      useEffect(() => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, JSON.stringify(value))
        }
      }, [key, value])

      // -------------------

    return [value,setValue]
}