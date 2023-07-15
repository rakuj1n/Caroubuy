import { connectToDB } from "@/utils/database"
import UserManual from "@/models/usermanual"
import Account from "@/models/account"


export const POST = async (req,res) => {
    const data = await req.json()
    console.log('hi',data)
    try {
        return new Response(JSON.stringify(data),{status:201})
    } catch (err) {
        return new Response("Failed request.",{status:500})
    }
}


