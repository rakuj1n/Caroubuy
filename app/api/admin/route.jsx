import { connectToDB } from "@/utils/database"
import Account from "@/models/account"
import Listing from "@/models/listing"
import UserManual from "@/models/usermanual"
import UserOAuth from "@/models/useroauth"
import Receipt from "@/models/receipt"

export const GET = async (req,res) => {
    try {
        await connectToDB()
        const listings = await Listing.find({}).sort({createdAt:-1}).populate('seller')
        const listings2 = await UserManual.populate(listings,{
            path:"seller.usermanual", select: 'username'
        })
        const listings3 = await UserOAuth.populate(listings2,{
            path:"seller.useroauth", select: 'username'
        })
        const receipts = await Receipt.find({}).sort({createdAt:-1})
        return new Response(JSON.stringify({listing:listings3,receipt:receipts}),{status:200})
    } catch (err) {
        return new Response("Failed request.",{status:500})
    }
}

