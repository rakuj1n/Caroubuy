import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@/utils/database";
import UserOAuth from '@/models/useroauth.js'
import Account from "@/models/account";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await UserOAuth.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString()
    
            return session
        },
        async signIn({ profile }) {
            try {
                await connectToDB()
    
                const user = await UserOAuth.findOne({email:profile.email})
    
                if (!user) {
                    const newuser = await UserOAuth.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                    await Account.create({
                        useroauth: newuser._id,
                        image: profile.picture
                    })
                }
    
                return true
            } catch (err) {
                console.log(err)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }