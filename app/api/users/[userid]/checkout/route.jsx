import { connectToDB } from "@/utils/database"
import Account from "@/models/account"
import Listing from "@/models/listing"
import UserManual from "@/models/usermanual"
import UserOAuth from "@/models/useroauth"
import Receipt from "@/models/receipt"

export const GET = async (req,{params}) => {
    try {
        await connectToDB()
        let account = await Account.findOne({_id:params.userid}).populate('cart')
        let listing = await Listing.populate(account, {path:'cart.seller',model:'Account',select:['useroauth','usermanual']})
        let listing2 = await UserManual.populate(listing, {path:'cart.seller.usermanual',model:'UserManual',select:['username', '_id']})
        let listing3 = await UserOAuth.populate(listing2,{path:'cart.seller.useroauth',model:'UserOAuth',select:['username', '_id']})
        
        // replace db account's cart with only buyable items
        let filterOutBought = listing3.cart.filter(item => !item.buyer).map(item => item._id)
        let accountToChange = await Account.findOne({_id:params.userid})
        accountToChange.cart = filterOutBought
        await accountToChange.save()


        return new Response(JSON.stringify(listing3),{status:200})
    } catch (err) {
        return new Response('Failed request.',{status:500})
    }
}

export const POST = async (req,{params}) => {
    try {
        await connectToDB()
        let data = await req.json()
        //for each listing id, check if .buyer exists
        let listing = await Listing.find({_id:[...data]})
        //if yes, log id into ErrorPurchase receipt creation later
        let purchaseError = listing.filter(item => !!item.buyer)
        //if no, change listing.buyer to params.userid and save
        let purchaseSuccess = listing.filter(item => !item.buyer)
        let result = await Listing.updateMany({ _id: { $in: purchaseSuccess }, buyer: { $exists: false } },
            { $set: { buyer: params.userid }})
        
        let modifiedIds = await Listing.find(
            { _id: { $in: purchaseSuccess }, buyer: params.userid },
            { _id: 1 }
        ).lean()
        
        modifiedIds = modifiedIds.map((doc) => doc._id)
        
        console.log('Modified IDs:', modifiedIds)
        //create new receipt
        let purchaseErrorArr = purchaseError.map(item => item._id)
        let receipt = await Receipt.create({
            account: params.userid,
            successPurchase:[...modifiedIds],
            errorPurchase:[...purchaseErrorArr]
        })

        return new Response(JSON.stringify(receipt),{status:200})
    } catch (err) {
        return new Response('Failed request.',{status:500})
    }
}
