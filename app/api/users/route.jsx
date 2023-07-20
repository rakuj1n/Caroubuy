import { connectToDB } from "@/utils/database"
import UserManual from "@/models/usermanual"
import Account from "@/models/account"
import { createJWT } from "@/utils/tokenAndFetch"
import bcrypt from 'bcrypt'
import { cookies } from "next/dist/client/components/headers"


export const POST = async (req,res) => {
    const { username, email, password } = await req.json()

    try {
        await connectToDB()
        const existingUserManual = await UserManual.findOne({email:email})
        if (existingUserManual) throw new Error('Email is already registered.')
        const newUserManual = await UserManual.create({
            username,
            email,
            password
        })
        const newaccountmanual = await Account.create({usermanual:newUserManual._id})
        newUserManual.account = newaccountmanual._id
        await newUserManual.save()
        const token = createJWT(newUserManual)
        cookies().set({
            name: 'client-token',
            value: token,
            httpOnly: true,
            maxAge: 86400,
            path:'/'
          })
        return new Response(JSON.stringify(token),{status:201})
    } catch (err) {
        return new Response('Failed.',{status:500})
    }
}

export const PUT = async (req) => {
    try {
        const details = await req.json() 
        let user = await UserManual.findOne({account:details.user})
        if (!user) throw new Error('No such user.')
        const match = await bcrypt.compare(details.old, user.password);
        if (!match) throw new Error();
        user.password = details.new;
        await user.save();
        return new Response(JSON.stringify(user),{status:200})
    } catch (err) {
        return new Response('Failed.', {status:500})
    }
}