import { connectToDB } from "@/utils/database"
import Account from "@/models/account"

export const GET = async (req,{params}) => {
    try {
        await connectToDB()
        const image = await Account.findOne({usermanual: params.userid})
        return new Response(JSON.stringify(image),{status:200})
    } catch (err) {
        return new Response('Failed request.',{status:500})
    }
}