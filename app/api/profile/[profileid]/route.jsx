import { connectToDB } from "@/utils/database"
import Account from "@/models/account"
import Listing from "@/models/listing"
import UserManual from "@/models/usermanual"
import UserOAuth from "@/models/useroauth"

export const GET = async (req,{params}) => {
    try {
        await connectToDB()
        // RMBR TO ADD PURCHASE HISTORY IN MODELS!
        const profileaccount = await Account.findById(params.profileid)
        if (profileaccount.usermanual) {
            const listings = await Listing.find({seller:profileaccount._id}).sort({createdAt:-1}).populate('seller')
            const listings2 = await UserManual.populate(listings,{
                path:"seller.usermanual", select: ['username','email']
            }) 

            return new Response(JSON.stringify(listings2),{status:200})
        } else {
            const listings = await Listing.find({seller:profileaccount._id}).sort({createdAt:-1}).populate('seller')
            const listings2 = await UserOAuth.populate(listings,{
                path:"seller.useroauth", select: ['username','email']
            }) 

            return new Response(JSON.stringify(listings2),{status:200})
        }

    } catch (err) {
        return new Response("Failed request.",{status:500})
    }
}

