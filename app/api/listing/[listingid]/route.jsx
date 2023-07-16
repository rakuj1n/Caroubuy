import { connectToDB } from "@/utils/database"
import Account from "@/models/account"
import Listing from "@/models/listing"
import UserManual from "@/models/usermanual"
import UserOAuth from "@/models/useroauth"

export const GET = async (req,{params}) => {
    try {
        await connectToDB()
        const indivlisting = await Listing.findById(params.listingid).populate('seller')
        
        if (!indivlisting) throw new Error('No such listing.')

        if (indivlisting.seller.usermanual) {
            const indivlisting2 = await UserManual.populate(indivlisting,{
                path:"seller.usermanual", select: 'username'
            })
            return new Response(JSON.stringify(indivlisting2),{status:200})
        } else {
            const indivlisting2 = await UserOAuth.populate(indivlisting,{
                path:"seller.useroauth", select: 'username'
            })
            return new Response(JSON.stringify(indivlisting2),{status:200})
        }
        
    } catch (err) {
        return new Response("Failed request.",{status:500})
    }
}

