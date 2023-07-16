import { connectToDB } from "@/utils/database"
import UserManual from "@/models/usermanual"
import Account from "@/models/account"
import { createJWT } from "@/utils/tokenAndFetch"


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
        return new Response(JSON.stringify(token),{status:201})
    } catch (err) {
        return new Response('Failed.',{status:500})
    }
}