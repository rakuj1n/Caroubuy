'use client'
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"

export default function ImageUpload({onChange, value}) {
    
    // const handleUpload = useCallback(() => {
    //     onChange(result.info.secure_url)
    // },[])

    const handleUpload = useCallback((result) => {
        onChange(result.info.secure_url)
    },[onChange])

    return (
        <CldUploadWidget 
            onUpload={handleUpload}
            uploadPreset="d3zoxpf6"
            options={{maxFiles: 1}}
        >
        {({open}) => {
            return (
                <div className="slidein" >
                    <div className='uploadimgfield' onClick={() => open?.()}>
                        {!value && <p>Click to upload Image</p>}
                    {value && (
                        <div className="thumbnail-preview">
                            <Image 
                                alt='upload'
                                fill
                                style={{objectFit:'cover',borderRadius:'15px'}}
                                src={value}
                            />
                        </div>
                    )}
                    </div>
                </div>
            )
        }}
        </CldUploadWidget>
        
    )
}