import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"
import { verifyAuth } from './utils/auth'

 
// Limit the middleware to paths starting with `/api/`
// export const config = {
//   matcher: '/api/:function*',
// }
 
export async function middleware(req) {
  
  const path = req.nextUrl.pathname
  const method = req.method
  let token = req.headers.get('authorization')
  let clientToken = req.cookies.get('client-token')?.value
  const oauthtoken = await getToken({req})
  const verifiedToken = token && (await verifyAuth(token.replace('Bearer ','')).catch((err) => {console.log(err)}))
  const verifiedClientToken = clientToken && (await verifyAuth(clientToken).catch((err) => {console.log(err)}))


  if ((!verifiedClientToken && !oauthtoken) && (path.startsWith('/mybasket'))) {
    return NextResponse.redirect(new URL('/',req.url))
  }

  if ((!verifiedClientToken && !oauthtoken) && (path.startsWith('/create-listing'))) {
    return NextResponse.redirect(new URL('/',req.url))
  }

  if ((verifiedClientToken || oauthtoken) && (path.startsWith('/login'))) {
    return NextResponse.redirect(new URL('/',req.url))
  }

  if ((verifiedClientToken || oauthtoken) && (path.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/',req.url))
  }

  if ((!verifiedClientToken && !oauthtoken) && (path.startsWith('/mylisting'))) {
    return NextResponse.redirect(new URL('/',req.url))
  }

  if ((!verifiedClientToken && !oauthtoken) && (/profile\/.*\/myfavs/).test(path)) {
    return NextResponse.redirect(new URL('/',req.url))
  }

  if ((!verifiedClientToken && !oauthtoken) && (/profile\/.*\/purchase-history/).test(path)) {
    return NextResponse.redirect(new URL('/',req.url))
  }

  if ((!verifiedClientToken && !oauthtoken) && (/profile\/.*\/settings/).test(path)) {
    return NextResponse.redirect(new URL('/',req.url))
  }

  if ((oauthtoken) && (/profile\/.*\/settings/).test(path)) {
    return NextResponse.redirect(new URL('/',req.url))
  }

  if ((/^\/profile\/.*\/settings$/).test(path)) {
    if (path.split("/")[2] !== verifiedClientToken.user.account) {
      return NextResponse.redirect(new URL('/',req.url))
    }
  }

  if ( (oauthtoken) && (path.startsWith('/dashboard')) ) {
    return NextResponse.redirect(new URL('/',req.url))
  }

  if ( (verifiedClientToken?.user.role !== 'admin') && (path.startsWith('/dashboard')) ) {
    return NextResponse.redirect(new URL('/',req.url))
  }



  if ((!verifiedToken && !oauthtoken) && (path.startsWith('/api/listing')) && method == "POST") {
    return new NextResponse(JSON.stringify({message: 'authentication failed.'}),{status:401})
  }

  if ((!verifiedToken && !oauthtoken) && (path.startsWith('/api/profile')) && method == "PUT") {
    return new NextResponse(JSON.stringify({message: 'authentication failed.'}),{status:401})
  }

  if ((!verifiedToken && !oauthtoken) && ( (path !== '/api/users/login') && path.startsWith('/api/users/')) ) {
    return new NextResponse(JSON.stringify({message: 'authentication failed.'}),{status:401})
  }

  if ((!verifiedToken && !oauthtoken) && (path == '/api/users') && method == "PUT") {
    return new NextResponse(JSON.stringify({message: 'authentication failed.'}),{status:401})
  }

  if ((oauthtoken) && (path == '/api/users') && method == "PUT") {
    return new NextResponse(JSON.stringify({message: 'authentication failed.'}),{status:401})
  }

  if ((verifiedToken) && (path == '/api/users') && method == "PUT") {
    const data = await req.json()
    if (data.user !== verifiedClientToken?.user.account) {
      return new NextResponse(JSON.stringify({message: 'authentication failed.'}),{status:401})
    }
  }

  if ((!verifiedToken && !oauthtoken) && (path == '/api/admin')) {
    return new NextResponse(JSON.stringify({message: 'authentication failed.'}),{status:401})
  }

  if ((oauthtoken) && (path == '/api/admin')) {
    return new NextResponse(JSON.stringify({message: 'authentication failed.'}),{status:401})
  }

  if ((verifiedToken?.user.role !== 'admin') && (path == '/api/admin')) {
    return new NextResponse(JSON.stringify({message: 'authentication failed.'}),{status:401})
  }

  return NextResponse.next()
}


