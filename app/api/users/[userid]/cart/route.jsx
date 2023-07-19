import { connectToDB } from "@/utils/database"
import Account from "@/models/account"
import Listing from "@/models/listing"

export const GET = async (req,{params}) => {
    try {
        await connectToDB()
        // const indivlisting = await Listing.findById(params.listingid).populate('seller')
        
        // if (!indivlisting) throw new Error('No such listing.')

        // if (indivlisting.seller.usermanual) {
        //     const indivlisting2 = await UserManual.populate(indivlisting,{
        //         path:"seller.usermanual", select: 'username'
        //     })
        //     return new Response(JSON.stringify(indivlisting2),{status:200})
        // } else {
        //     const indivlisting2 = await UserOAuth.populate(indivlisting,{
        //         path:"seller.useroauth", select: 'username'
        //     })
        //     return new Response(JSON.stringify(indivlisting2),{status:200})
        // }
        let account = await Account.findOne({_id:params.userid})
        return new Response(JSON.stringify(account.cart),{status:200})
    } catch (err) {
        return new Response('Failed request.',{status:500})
    }
}

export const POST = async (req,{params}) => {
    try {
        await connectToDB()
        let data = await req.json()
        let account = await Account.findOneAndUpdate(
            { _id: params.userid },
            { $addToSet: { cart: (data.id) } }
            )
        console.log('success')
        return new Response(JSON.stringify(account),{status:200})
    } catch (err) {
        return new Response('Failed request.',{status:500})
    }
}

export const DELETE = async (req,{params}) => {
    try {
        await connectToDB()
        let data = await req.json()
        let account = await Account.findOneAndUpdate(
            { _id: params.userid },
            { $pull: { cart: (data.id) } }
            )
        console.log('success')
        return new Response(JSON.stringify(account),{status:200})
    } catch (err) {
        return new Response('Failed request.',{status:500})
    }
}
