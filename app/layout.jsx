'use client'

import Link from 'next/link'
import './globals.css'
import Image from 'next/image'
import Logout from '@/components/Logout'
import Navbar from '@/components/Navbar'
import Provider from '@/components/Provider'
import {StateProvider} from '@/components/Context'

export const metadata = {
  title: 'Caroubuy',
  description: 'Buy and Sell your wares',
}

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bellota+Text:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Inconsolata:wght@300;400;500;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Rubik:wght@300;400;500&display=swap" rel="stylesheet"/>
      </head>

      <body>

        <Provider>

          <main>
            <div className='about-link'>
              <Link href='/about'>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="background-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: "#B4E2FF"}} />
                      <stop offset="100%" style={{stopColor: "#fcfad2"}} />
                    </linearGradient>
                  </defs>
                  <polygon points="100,30 170,70 170,130 100,170 30,130 30,70" fill="url(#background-gradient)" />
                </svg>
              </Link>
            </div>

            <Logout />
            <Navbar />
            {children}
          </main>

        </Provider>

      </body>
    </html>
  )
}
