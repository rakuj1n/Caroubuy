'use client'

import Image from 'next/image'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'



export default function Home() {
  const [providers, setProviders] = useState(null)
  const { data: session } = useSession()

  useEffect(() => {
    const setUp = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUp()
  },[])

  return (
    <main className='home-main'>
      <motion.div>
        <motion.h2
        className='welcome-to'
          initial={{y:-50, opacity:0}}
          animate={{y:0, opacity:100,duration:"3"}}
        >Welcome to</motion.h2>
        <motion.h1 className='caroubuy'>Caroubuy</motion.h1>

        {providers && !session?.user && 
        <div className='sign-in-container'>
          <div className='sign-in-provider-list'>
            {Object.values(providers).map((provider) => (
                <motion.button 
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >Sign in with Google</motion.button>
              ))}
          </div>
          <div className='manual-sign'>
            <motion.p>
              or <Link href='/signup'>Sign Up</Link> / <Link href='login'>Login</Link> here
            </motion.p>
          </div>
        </div>
          }
        
        
      </motion.div>
      </main>
  )
}

{/* <MyComponent as={motion.div} animate={{ y: 100 }} /> */}
// const MyCustomComponent = styled(motion.div)`
//   width: 2rem;
//   background-color: tomato;
// `;

// const Container = styled.div`
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `