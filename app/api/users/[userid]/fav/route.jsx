import { connectToDB } from "@/utils/database"
import Account from "@/models/account"
import Listing from "@/models/listing"

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
        if (accountoauth) {
            let listingoauth = await Listing.findOneAndUpdate(
            { _id: data.listingId },
            { $addToSet: { favby: (accountoauth._id) } }
            )
        }   
        if (accountmanual) {
            let listingmanual = await Listing.findOneAndUpdate(
                { _id: data.listingId },
                { $addToSet: { favby: (accountmanual._id) } }
                )
        } 
        console.log('success')
        return new Response(JSON.stringify(accountoauth || accountmanual),{status:200})
    } catch (err) {
        return new Response('Failed request.',{status:500})
    }
}
