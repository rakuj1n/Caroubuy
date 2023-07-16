import { connectToDB } from "@/utils/database"
import Account from "@/models/account"

export const PATCH = async (req,{params}) => {
    try {
        await connectToDB()
        let data = await req.json()
        let accountoauth = await Account.findOneAndUpdate(
            { useroauth: params.userid },
            { $addToSet: { favitems: data.listingId } }
        )
        let accountmanual = await Account.findOneAndUpdate(
            { usermanual: params.userid },
            { $addToSet: { favitems: data.listingId } }
        )
        return new Response(JSON.stringify(accountoauth || accountmanual),{status:200})
    } catch (err) {
        return new Response('Failed request.',{status:500})
    }
}
