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
            const profileaccount2 = await UserManual.populate(profileaccount,{
                path:'usermanual', select:['username','email']
            })
            const listing = await Listing.find({seller:params.profileid})
            return new Response(JSON.stringify({profile:profileaccount2,listings:listing}),{status:200})
        } else {
            const profileaccount2 = await UserOAuth.populate(profileaccount,{
                path:'useroauth', select:['username','email']
            })
            const listing = await Listing.find({seller:params.profileid})
            return new Response(JSON.stringify({profile:profileaccount2,listings:listing}),{status:200})
        }
    } catch (err) {
        return new Response("Failed request.",{status:500})
    }
}

