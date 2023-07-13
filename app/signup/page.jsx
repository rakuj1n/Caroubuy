'use client'

import { Back } from "@/utils/svg"
import Link from "next/link"
import { useState } from "react"

export default function SignUp() {
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
        if (password.length < 7) {
            console.log('check password length')
            return false
        }
        return true
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        if (handleValidation()) {
            console.log('submitted')
            setDisableSubmit(true) //to set false once fetch is over
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