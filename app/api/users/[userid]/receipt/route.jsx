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
        console.log(receipts)
        return new Response(JSON.stringify(receipts),{status:200})
    } catch (err) {
        return new Response('Failed request.',{status:500})
    }
}


 // await connectToDB()
        // let account = await Account.findOne({_id:params.userid}).populate('cart')
        // let listing = await Listing.populate(account, {path:'cart.seller',model:'Account',select:['useroauth','usermanual']})
        // let listing2 = await UserManual.populate(listing, {path:'cart.seller.usermanual',model:'UserManual',select:['username', '_id']})
        // let listing3 = await UserOAuth.populate(listing2,{path:'cart.seller.useroauth',model:'UserOAuth',select:['username', '_id']})
        
        // // replace db account's cart with only buyable items
        // let filterOutBought = listing3.cart.filter(item => !item.buyer).map(item => item._id)
        // let accountToChange = await Account.findOne({_id:params.userid})
        // accountToChange.cart = filterOutBought
        // await accountToChange.save()
        // console.log(accountToChange)