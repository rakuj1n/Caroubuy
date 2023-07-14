'use client'

import { Back } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { StateContext } from "@/components/Context"

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
            (console.log('check confirm password'))
            return false
        }
        if (password.length === 0) {
            (console.log('check password'))
            return false
        }
        if (email.length === 0) {
            (console.log('check email'))
            return false
        }
        if (password.length < 8) {
            console.log('check password length')
            return false
        }
        if (username.length === 0) {
            console.log('check username')
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
                    router.push('/')
                }
            } catch (err) {
                console.log(err)
            } finally {
                setDisableSubmit(false)
            }
        } else {
            console.log('error')
        }
    }

    return (
        <section className="sign-up-page-container">
            <div className="back-sign-up">
                <Link href='/'><Back /></Link>
            </div>
            <div className="sign-up-container">

                <form className="form-container" onSubmit={handleSubmit}>
                    <h2 className="sign-up">Sign Up</h2>
                    <input name='username' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} placeholder="Username" value={formData.username}/>
                    <input name='email' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='email' placeholder="Email" value={formData.email}/>
                    <input name='password' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='password' placeholder="Password" value={formData.password}/>
                    <input name='confirm' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='password' placeholder="Confirm Password" value={formData.confirm}/>
                    <button disabled={disableSubmit}>Create New User</button>
                </form>
    
            </div> 
        </section>
    )
} 