'use client'

import { useSession, signOut } from "next-auth/react"
import { Logoutbutton } from "@/utils/svg"


export default function Logout() {
    const { data: session } = useSession()

    return (
        <>

        {
        session?.user ?    
        <div className='logout'>
            <div className='logout-button' onClick={() => signOut()}>
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