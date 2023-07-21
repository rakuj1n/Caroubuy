import { connectToDB } from "@/utils/database"
import Account from "@/models/account"
import Listing from "@/models/listing"
import UserManual from "@/models/usermanual"
import UserOAuth from "@/models/useroauth"

export const GET = async (req,res) => {
    try {
        await connectToDB()
        console.log('hi! request got through')
        return new Response(JSON.stringify({message:'hi!'}),{status:200})
        // if (req.nextUrl.searchParams.get('usermanual')) {
        //     const account = await Account.findOne({usermanual:req.nextUrl.searchParams.get('usermanual')})
        //     const listings = await Listing.find({seller:account._id}).sort({createdAt:-1}).populate('seller')
        //     const listings2 = await UserManual.populate(listings,{
        //         path:"seller.usermanual", select: 'username'
        //     })
        //     return new Response(JSON.stringify(listings2),{status:200})
        // } else if (req.nextUrl.searchParams.get('useroauth')) {
        //     const account = await Account.findOne({useroauth:req.nextUrl.searchParams.get('useroauth')})
        //     const listings = await Listing.find({seller:account._id}).sort({createdAt:-1}).populate('seller')
        //     const listings2 = await UserOAuth.populate(listings,{
        //         path:"seller.useroauth", select: 'username'
        //     })
        //     return new Response(JSON.stringify(listings2),{status:200})
        // } else {
        //     const listings = await Listing.find({}).sort({createdAt:-1}).populate('seller')
        //     const listings2 = await UserManual.populate(listings,{
        //         path:"seller.usermanual", select: 'username'
        //     })
        //     const listings3 = await UserOAuth.populate(listings2,{
        //         path:"seller.useroauth", select: 'username'
        //     })
        //     return new Response(JSON.stringify(listings3),{status:200})
        // }
    } catch (err) {
        return new Response("Failed request.",{status:500})
    }
}

