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
              <Link href='/'>
              <svg className='home-link' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
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
