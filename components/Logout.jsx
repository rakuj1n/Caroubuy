'use client'

import { useSession, signOut } from "next-auth/react"
import { Logoutbutton } from "@/utils/svg"
import { logOut } from "@/utils/tokenAndFetch"
import { useContext } from "react"
import { StateContext } from "./Context"
import { useRouter } from "next/navigation"



export default function Logout() {
    const { data: session } = useSession()
    const glob = useContext(StateContext)
    const router = useRouter()

    function handleLogOut() {
            logOut()
            signOut()
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