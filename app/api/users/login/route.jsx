import { connectToDB } from "@/utils/database"
import UserManual from "@/models/usermanual"
import Account from "@/models/account"
import { createJWT } from "@/utils/tokenAndFetch"
import bcrypt from 'bcrypt'

export const POST = async (req,res) => {
    const {username,password} = await req.json()

    try {
        await connectToDB()
        const user = await UserManual.findOne({username:username})
        if (!user) throw new Error("No such user.")
        const match = await bcrypt.compare(password,user.password)
        if (!match) throw new Error("Wrong password.")
        return new Response(JSON.stringify(createJWT(user)),{status:200})
    } catch (err) {
        return new Response(err, {status:500})
    }
}