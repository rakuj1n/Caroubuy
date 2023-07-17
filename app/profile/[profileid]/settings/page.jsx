'use client'

import { StateContext } from "@/components/Context"
import ImageUpload from "@/components/ImageUpload"
import { AddToBasket, FilledHeart, Heart } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


export default function Settings({params}) {
    const [submitting,setSubmitting] = useState(false)
    const router = useRouter()
    const {data:session} = useSession()
    const glob = useContext(StateContext)
    const [formData,setFormData] = useState({
        user: params.profileid,
        old:'',
        new:''
    })

    useEffect(() => {
        const loggedInManual = getUser()
        if (loggedInManual) {
          glob.setState(prev => ({...prev, usermanual: loggedInManual}))
        }
    
        const getImage = async (userid) => {
          const user = await request(`/api/users/${userid}/image`)
          glob.setState(prev => ({...prev,userimage: user?.image}))
        }
        getImage(glob.state?.usermanual?._id)
      },[glob.state?.usermanual?._id])

      async function handleSubmit(e) {
        e.preventDefault()

        if (formData.old.length < 8) {
            return console.log('enter old password')
        }

        if (formData.new.length < 8) {
            return console.log('enter new password')
        }

        try {
            const res = await request('/api/users','PUT',formData)
            console.log(res)
            if (res !== undefined) {
                router.push(`/profile/${params.profileid}`)
            }
        } catch (err) {
            console.log(err)
        }
      }

    return (
        <div className="home-main">
            <div className="overall-page-container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <h2 className="sign-up">Change Password</h2>    
                    <input name='old' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='password' placeholder="Current Password" value={formData.old}/>
                    <input name='new' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='password' placeholder="New Password" value={formData.new}/>
                    <button disabled={formData.old === formData.new}>Change Password</button>
                </form>
            </div>
        </div>
    )
}