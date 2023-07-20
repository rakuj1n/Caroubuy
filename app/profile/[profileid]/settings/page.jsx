'use client'

import { StateContext } from "@/components/Context"
import Loading from "@/components/Loading"
import ProfileImageUpload from "@/components/ProfileImageUpload"
import { AddToBasket, FilledHeart, Heart } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

// PREVENT OAUTH USERS FROM ACCESSING THIS PAGE

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
    const [picData,setPicData] = useState('')

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

      async function handleSubmitPic(e) {
        e.preventDefault()

        try {
            const res = await request(`/api/profile/${params.profileid}`,"PUT",picData)
            if (res !== undefined) {
                router.push(`/profile/${params.profileid}`)
            }
        } catch (err) {
            console.log(err)
        }
      }

    // protect URL route on client side---------

    useEffect(() => {
        if (!glob.state.usermanual?._id && !session?.user) {
            router.push('/')
        }
    },[glob.state.usermanual?._id,session?.user])

    if (!glob.state.usermanual?._id && !session?.user) return <Loading />

    // protect URL route on client side---------

    return (
        <div className="home-main">
            <div className="overall-page-container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <h2 className="sign-up">Change Password</h2>    
                    <input name='old' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='password' placeholder="Current Password" value={formData.old}/>
                    <input name='new' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='password' placeholder="New Password" value={formData.new}/>
                    <button disabled={formData.old === formData.new}>Change Password</button>
                </form>
                <form style={{marginTop:'20px'}} className="form-container" onSubmit={handleSubmitPic}>
                    <h2 className="sign-up">Change Profile Image</h2>    
                    <ProfileImageUpload onChange={(value) => setPicData(value)} value={picData}/>
                    <button disabled={picData.length === 0}>Change Profile Image</button>
                </form>
            </div>
        </div>
    )
}