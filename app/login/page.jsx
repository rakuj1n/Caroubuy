'use client'

import { StateContext } from "@/components/Context";
import { Back } from "@/utils/svg";
import { getUser, request } from "@/utils/tokenAndFetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";


export default function LogIn() {
    const glob = useContext(StateContext)
    const router = useRouter()
    const [disableSubmit,setDisableSubmit] = useState(false)
    const [formData,setFormData] = useState({
        username: "",
        password: ""
    })

    function handleValidation() {
        const {username,password} = formData
        if (username.length === 0) {
            (console.log('check username'))
            return false
        }
        if (password.length === 0) {
            (console.log('check password'))
            return false
        }
        if (password.length < 7) {
            console.log('check password length')
            return false
        }
        return true
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        if (handleValidation()) {
            console.log('submitted')
            setDisableSubmit(true) //to set false once fetch is over
            try {
                const response = await request('/api/users/login','POST',formData)
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
                    <h2 className="sign-up">Log In</h2>
                    <input name='username' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} placeholder="Username" value={formData.username}/>
                    <input name='password' onChange={(e) => setFormData(prev => ({...prev, [e.target.name]:e.target.value}))} type='password' placeholder="Password" value={formData.password}/>
                    <button disabled={disableSubmit}>Enter</button>
                </form>
    
            </div> 
        </section>
    )
}