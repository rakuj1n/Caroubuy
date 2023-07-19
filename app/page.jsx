'use client'

import Image from 'next/image'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState,useEffect, useContext } from 'react'
import { signIn, useSession, getProviders } from 'next-auth/react'
import { StateContext } from '@/components/Context'
import { getUser, request } from '@/utils/tokenAndFetch'
import Loading from '@/components/Loading'
import { useShoppingCart } from '@/components/ShoppingCartContext'



export default function Home() {
  const [status,setStatus] = useState('loading')
  const glob = useContext(StateContext)
  const [providers, setProviders] = useState(null)
  const { data: session } = useSession()

  // ShoppingContext--------------------------

  const { fetchCartItems,getCart,getTotalQty,addItem,removeItem } = useShoppingCart()

  // ShoppingContext--------------------------

  useEffect(() => {
    const setUp = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUp()
    fetchCartItems()
    const loggedInManual = getUser()
    if (loggedInManual) {
      glob.setState(prev => ({...prev, usermanual: loggedInManual}))
    }

    const getImage = async (userid) => {
      const user = await request(`/api/users/${userid}/image`)
      glob.setState(prev => ({...prev,userimage: user?.image}))
      setStatus('success')
    }
    getImage(glob.state.usermanual?._id)
  },[glob.state.usermanual?._id])

  if (status === 'loading') return <Loading />

  return (
    <main className='home-main'>
      <motion.div>
        <motion.h2
        className='welcome-to'
          initial={{y:-50, opacity:0}}
          animate={{y:0, opacity:100,duration:"3"}}
        >Welcome to</motion.h2>
        <motion.h1 className='caroubuy'>Caroubuy</motion.h1>

        {providers && (!session?.user && !glob.state.usermanual) && 
        <div className='sign-in-container'>
          <div className='sign-in-provider-list'>
            {Object.values(providers).map((provider) => (
                <motion.button 
                  className='provider-button'
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >Sign in with Google</motion.button>
              ))}
          </div>
          <p className='or'>or</p>
          <div className='manual-sign'>
            <motion.p className='or-sign-up-login'>
              <Link href='/signup'>Sign Up</Link> / <Link href='login'>Login</Link>
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