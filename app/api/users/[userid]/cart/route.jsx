import { connectToDB } from "@/utils/database"
import Account from "@/models/account"
import Listing from "@/models/listing"

export const GET = async (req,{params}) => {
    try {
        await connectToDB()
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
