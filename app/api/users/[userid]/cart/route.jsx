import { connectToDB } from "@/utils/database"
import Account from "@/models/account"
import Listing from "@/models/listing"

export const GET = async (req,{params}) => {
    try {
        await connectToDB()
        let account = await Account.findOne({_id:params.userid})

        const account1 = await Account.findById(params.userid).populate("cart")
        if (!account1) {
            return 0
        }
        const totalPrice = account1.cart.reduce((total, listing) => {
            return total + parseInt(listing.listingprice)
        }, 0)

        return new Response(JSON.stringify({cart:account.cart,total:totalPrice}),{status:200})
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
        let listing = await Listing.findById(data.id)
        console.log('success')
        return new Response(JSON.stringify(listing),{status:200})
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
            let listing = await Listing.findById(data.id)
        console.log('success')
        return new Response(JSON.stringify(listing),{status:200})
    } catch (err) {
        return new Response('Failed request.',{status:500})
    }
}
