'use client'
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"

export default function ProfileImageUpload({onChange, value}) {
    
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
                <div>
                    <div style={{height:'70px',width:'70px',borderRadius:'50%',border:value && 'none'}} className='uploadimgfield' onClick={() => open?.()}>
                        {!value && <p>Click</p>}
                    {value && (
                        <div style={{height:'70px',width:'70px',borderRadius:'50%'}} className="thumbnail-preview">
                            <Image 
                                alt='upload'
                                fill
                                style={{objectFit:'cover',borderRadius:'50%'}}
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