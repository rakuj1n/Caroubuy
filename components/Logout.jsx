'use client'

import { useSession, signOut } from "next-auth/react"
import { Logoutbutton } from "@/utils/svg"
import { logOut } from "@/utils/tokenAndFetch"
import { useContext } from "react"
import { StateContext } from "./Context"



export default function Logout() {
    const { data: session } = useSession()
    const glob = useContext(StateContext)

    function handleLogOut() {
        const token = localStorage.getItem('token')
        if (token) {
            logOut()
        } else {
            signOut()
        }
    }

    return (
        <>

        {
        session?.user || glob.state.usermanual ?    
        <div className='logout'>
            <div className='logout-button' onClick={handleLogOut}>
                <Logoutbutton />
            </div>
        </div>
        :
        <>
        </>
        }
        
        </>
    )
}