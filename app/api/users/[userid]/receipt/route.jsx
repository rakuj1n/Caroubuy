import { connectToDB } from "@/utils/database"
import Account from "@/models/account"
import Listing from "@/models/listing"
import UserManual from "@/models/usermanual"
import UserOAuth from "@/models/useroauth"
import Receipt from "@/models/receipt"

export const GET = async (req,{params}) => {
    try {
        await connectToDB()
        //fetch all receipts matching userid account sorted by createdAt
        let receipts = await Receipt.find({account:params.userid}).sort({createdAt:-1}).populate('successPurchase')

        return new Response(JSON.stringify(receipts),{status:200})
    } catch (err) {
        return new Response('Failed request.',{status:500})
    }
}
