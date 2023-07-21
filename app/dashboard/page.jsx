'use client'

import { request } from "@/utils/tokenAndFetch"
import { useEffect, useState } from "react"


export default function Dashboard() {

    const [allData, setAllData] = useState({})

    useEffect(() => {
        const fetchAllDataAdmin = async () => {
            try {
                const allData = await request('/api/admin',"GET")
                console.log(allData)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllDataAdmin()
    },[])

    return (
        <> 
        dashboard
        </>
    )
}