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
import toast, {Toaster} from 'react-hot-toast'

// PREVENT OAUTH USERS FROM ACCESSING THIS PAGE

export default function Settings({params}) {
    const [currSelected, setCurrSelected] = useState('password')
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
            return toast.error("Please re-enter your current password.")
        }

        if (formData.new.length < 8) {
            return toast.error("New password has to be at least 8 characters. Please try again.")
        }

        try {
            setSubmitting(true)
            const res = await request('/api/users','PUT',formData)
            console.log(res)
            if (res !== undefined) {
                toast.success('Password change successful! Redirecting...')
                    setTimeout(() => {
                        router.push(`/profile/${params.profileid}`)
                    },1000)
            } else {
                toast.error("Password change is unsuccessful. Please try again.")
            }
        } catch (err) {
            console.log(err)
        } finally {
            setTimeout(() => {                
                setSubmitting(false)
            },2000)
        }
      }

      async function handleSubmitPic(e) {
        e.preventDefault()
        setSubmitting(true)
        try {
            const res = await request(`/api/profile/${params.profileid}`,"PUT",picData)
            if (res !== undefined) {
                toast.success('Profile picture change successful! Redirecting...')
                    setTimeout(() => {
                        router.push(`/profile/${params.profileid}`)
                    },1000)
            } else {
                toast.error("Profile picture change is unsuccessful. Please try again.")
            }
        } catch (err) {
            console.log(err)
        } finally {
            setTimeout(() => {                
                setSubmitting(false)
            },2000)
        }
      }

    if (!glob.state.usermanual?._id && !session?.user) return <Loading />
    if (params.profileid !== glob.state.usermanual?.account) return <Loading />

    return (
        <div className="home-main">
            <div className="select-type slidedown"><p style={{color: currSelected==="password" ? 'white' : ''}} onClick={() => setCurrSelected('password')}>Change password</p><p style={{color: currSelected==='image' ? 'white' : ''}} onClick={() => setCurrSelected('image')}>Change profile picture</p></div>
            <div className="overall-page-container">
                {(currSelected === 'password') && 
                <form className="form-container slidein" onSubmit={handleSubmit}>
                    <h2 className="sign-up">Change Password</h2>    
                    <input name='old' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='password' placeholder="Current Password" value={formData.old}/>
                    <input name='new' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='password' placeholder="New Password" value={formData.new}/>
                    <button className='settings-button' disabled={formData.old === formData.new || submitting}>{submitting ? "Submitting..." : "Change Password"}</button>
                </form>}
                {(currSelected === 'image') && 
                    <form style={{marginTop:'20px'}} className="form-container slidedown" onSubmit={handleSubmitPic}>
                    <h2 className="sign-up">Change Profile Image</h2>    
                    <ProfileImageUpload onChange={(value) => setPicData(value)} value={picData}/>
                    <button className='settings-button' disabled={picData.length === 0 || submitting}>{submitting ? "Submitting..." : "Change Profile Image"}</button>
                </form>}
            </div>
        </div>
    )
}