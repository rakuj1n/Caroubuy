'use client'

import { StateContext } from "@/components/Context"
import ImageUpload from "@/components/ImageUpload"
import { Back } from "@/utils/svg"
import { getUser, request } from "@/utils/tokenAndFetch"
import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


export default function CreateListing() {
    const [submitting,setSubmitting] = useState(false)
    const router = useRouter()
    const {data:session} = useSession()
    const glob = useContext(StateContext)
    // const [file,setFile] = useState(null)
    const [imageSrc, setImageSrc] =  useState(null)
    const [formDetails,setFormDetails] = useState({
        listingname: '',
        price: '',
        description: ''
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
        getImage(glob.state.usermanual?._id)
      },[glob.state.usermanual?._id])

    //   function handleFileChange(e) {
    //     const image = e.target.files[0]
    //     if (image && image.type.startsWith('image/')) {
    //         setFile(image)
    //     } else {
    //         setFile(null)
    //         console.error('Invalid file format. Please upload an image.')
    //     }
    //   }

      async function handleSubmit(e) {
        e.preventDefault()

        if (!imageSrc) {
            return console.log('Please check uploaded file. Only images are allowed.')
        }
        if (formDetails.listingname.length === 0 || formDetails.price.length === 0 || formDetails.description.length === 0) {
            return console.log('Please ensure your listing name, price and description are filled up.')
        }

        if (!glob.state.usermanual?._id && !session?.user) {
            return console.log('No user.')
        }

        try {
            setSubmitting(true)
            await request('/api/listing','POST',{
                ...formDetails,
                imageSrc,
                usermanualid: glob.state.usermanual?._id,
                useroauthid: session?.user.id
            })
            router.push('/mylisting')
        } catch (err) {
            console.log(err)
        }

        // 'Content-Type': 'multipart/form-data' auto set when sending formdata???
        // const plainFormData = Object.fromEntries(formData.entries());
        // console.log(plainFormData)
        // to be sent to next.js server component to handle to save in s3 and db. middleware?
      }

    return (
        <div className="home-main">
            <div className="overall-page-container">
                {/* <Link className='back-above-content' href='/'><Back /></Link> */}
                <div className="content-container">
                    <form onSubmit={handleSubmit} className="form-container-create-listing">
                        <h2>Create Your Listing</h2>
                        <input onChange={(e) => setFormDetails(prev => ({...prev, [e.target.name]:e.target.value}))} value={formDetails.listingname} name='listingname' type='text' placeholder="Listing Name"/>
                        <input onChange={(e) => setFormDetails(prev => ({...prev, [e.target.name]:e.target.value}))} value={formDetails.price} name='price' type='number' step="0.01" placeholder="Enter a price"/>
                        <textarea onChange={(e) => setFormDetails(prev => ({...prev, [e.target.name]:e.target.value}))} value={formDetails.description} name='description' rows="5" cols="90" placeholder="Describe your listing"/>
                        {/* <input name='thumbnail' placeholder="Upload Thumbnail" type='file' onChange={handleFileChange}/> */}
                        <ImageUpload onChange={(value) => setImageSrc(value)} value={imageSrc}/>
                        <button disabled={submitting}>Create Listing</button>
                    </form>
                </div>
            </div>
        </div>
    )
}