import { connectToDB } from "@/utils/database"
import Account from "@/models/account"
import Listing from "@/models/listing"
import UserManual from "@/models/usermanual"
import UserOAuth from "@/models/useroauth"


export const POST = async (req,res) => {
    const data = await req.json()
    console.log('hi',data)
    try {
        await connectToDB()
        if (data.usermanualid) {
            const account = await Account.findOne({usermanual:data.usermanualid})
            const newListing = await Listing.create({
                listingname: data.listingname,
                listingdescription: data.description,
                listingthumbnail: data.imageSrc,
                listingprice: data.price,
                seller: account._id
            })
            return new Response(JSON.stringify(newListing),{status:201})
        } else {
            const account = await Account.findOne({useroauth:data.useroauthid})
            const newListing = await Listing.create({
                listingname: data.listingname,
                listingdescription: data.description,
                listingthumbnail: data.imageSrc,
                listingprice: data.price,
                seller: account._id
            })
            return new Response(JSON.stringify(newListing),{status:201})
        }
    } catch (err) {
        return new Response("Failed request.",{status:500})
    }
}

export const GET = async (req,res) => {
    try {
        await connectToDB()
        if (req.nextUrl.searchParams.get('usermanual')) {
            const account = await Account.findOne({usermanual:req.nextUrl.searchParams.get('usermanual')})
            const listings = await Listing.find({seller:account._id}).sort({createdAt:-1}).populate('seller')
            const listings2 = await UserManual.populate(listings,{
                path:"seller.usermanual", select: 'username'
            })
            return new Response(JSON.stringify(listings2),{status:200})
        } else if (req.nextUrl.searchParams.get('useroauth')) {
            const account = await Account.findOne({useroauth:req.nextUrl.searchParams.get('useroauth')})
            const listings = await Listing.find({seller:account._id}).sort({createdAt:-1}).populate('seller')
            const listings2 = await UserOAuth.populate(listings,{
                path:"seller.useroauth", select: 'username'
            })
            return new Response(JSON.stringify(listings2),{status:200})
        } else {
            const listings = await Listing.find({}).sort({createdAt:-1}).populate('seller')
            const listings2 = await UserManual.populate(listings,{
                path:"seller.usermanual", select: 'username'
            })
            const listings3 = await UserOAuth.populate(listings2,{
                path:"seller.useroauth", select: 'username'
            })
            return new Response(JSON.stringify(listings3),{status:200})
        }
    } catch (err) {
        return new Response("Failed request.",{status:500})
    }
}

