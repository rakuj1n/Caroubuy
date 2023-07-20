import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
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
  const oauthtoken = await getToken({req})

  const verifiedToken = token && (await verifyAuth(token.replace('Bearer ','')).catch((err) => {console.log(err)}))
   
  // console.log('login this')
  // if (
  //   path.startsWith('/login') ||
  //   path.startsWith('/listing')
  // ) {
  //   console.log('HI!!!',req.nextUrl.pathname,verifiedToken,oauthtoken)
  // }
  console.log('middleware',req.nextUrl.pathname,verifiedToken,oauthtoken)

  //  PLEASE CHECK UNSIGNED-IN MYBASKET ROUTE IF SHOPPING CART LOCALSTORAGE BECOMES UNDEFINED HENCCEC SCREWING OTHER PUBLIUC ROUTES
    
  // remember ONLY USE SPECIFIC ROUTES METHOD
  
  //URL paths (should not use token/tokenoauth since they are only present when accessing API routes)
  //  following paths must require verifiedToken (and oauth session token) to access:

  //api paths - return a new Response with 401 and unauthorised msg
  //  following paths must require verifiedToken (and oauth session token) to access:
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

  return NextResponse.next()
}



// return NextResponse.redirect(new URL('/',req.url))


  // Call our authentication function to check the request
//   if (!isAuthenticated(request)) {
//     // Respond with JSON indicating an error message
//     return new NextResponse(
//       JSON.stringify({ success: false, message: 'authentication failed' }),
//       { status: 401, headers: { 'content-type': 'application/json' } }
//     )
//   }


// if (token) {
//     token = token.replace('Bearer ','')
//     jwt.verify(token, process.env.SECRET, function(err,decoded) {
//         req.user = err ? null : decoded.user
//         req.exp = err ? null : new Date(decoded.exp * 1000)
//         console.log('Token verification result:', err ? 'Invalid token' : 'Token verified')
//         return next()
//     })


// /api/listing
// + GET
// - POST

// /api/profile/[profileid]
// + GET
// - PUT
// =======================
// /api/users/[userid]/cart
// - GET
// - POST
// - DELETE
// (ALL)

// /api/users/[userid]/checkout
// - GET
// - POST
// (ALL)

// /api/users/[userid]/fav
// (ALL)

// /api/users/[userid]/image
// (ALL)

// /api/users/[userid]/receipt
// (ALL)




// /api/users/login
// leave open

// /api/users
// - PUT
// + POST

//public users can only access /login, /signup, /, /listing, /listing/:listingid and maybe /profile/:profileid?