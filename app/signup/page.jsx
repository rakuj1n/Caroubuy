'use client'

import { Back } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { StateContext } from "@/components/Context"
import toast, { Toaster } from 'react-hot-toast'

export default function SignUp() {
    const glob = useContext(StateContext)
    const router = useRouter()
    const [disableSubmit,setDisableSubmit] = useState(false)
    const [formData,setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm: ""
    })

    function handleValidation() {
        const {username,email,password,confirm} = formData
        if (password !== confirm) {
            toast.error('Please re-confirm your password.')
            return false
        }
        if (password.length === 0) {
            toast.error("Check password field.")
            return false
        }
        if (email.length === 0) {
            toast.error("Check email field.")
            return false
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters.")
            return false
        }
        if (username.length === 0) {
            toast.error("Please enter a username.")
            return false
        }
        if (username.length > 20) {
            toast.error("Username cannot be more than 20 characters.")
            return false
        }
        return true
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        if (handleValidation()) {
            console.log('submitted')
            setDisableSubmit(true) 
            try {
                const response = await request('/api/users','POST',formData)
                if (response) {
                    localStorage.setItem('token',response)
                    glob.setState(prev => ({...prev, usermanual:getUser()}))
                    toast.success('Sign Up Successful! Redirecting...')
                    setTimeout(() => {
                        router.push('/')
                    },1000)
                } else {
                    toast.error("Username and/or email already exists.")
                }
            } catch (err) {
                console.log(err)
            } finally {
                setTimeout(() => {                
                    setDisableSubmit(false)
                },2000)
            }
        } else {
            console.log('error')
        }
    }
    
    return (
        <section className="sign-up-page-container">
            <Toaster />
            <div className="zero back-sign-up slidein">
                <Link href='/'><Back /></Link>
            </div>
            <div className="sign-up-container">

                <form className="form-container" onSubmit={handleSubmit}>
                    <h2 className="sign-up slidein">Sign Up</h2>
                    <input className="zero slidein1" name='username' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} placeholder="Username" value={formData.username}/>
                    <input className="zero slidein2" name='email' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='email' placeholder="Email" value={formData.email}/>
                    <input className="zero slidein3" name='password' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='password' placeholder="Password" value={formData.password}/>
                    <input className="zero slidein4" name='confirm' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='password' placeholder="Confirm Password" value={formData.confirm}/>
                    <button className='zero buttons slidein4' disabled={disableSubmit}>{disableSubmit ? "Please wait..." : "Create New User"}</button>
                </form>
    
            </div> 
        </section>
    )
} 