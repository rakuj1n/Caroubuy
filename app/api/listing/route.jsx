import { connectToDB } from "@/utils/database"
import Account from "@/models/account"
import Listing from "@/models/listing"


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
        if (req.nextUrl.searchParams.get('usermanual')) {
            const account = await Account.findOne({usermanual:req.nextUrl.searchParams.get('usermanual')})
            const listings = await Listing.find({seller:account._id})
            return new Response(JSON.stringify(listings),{status:200})
        }
        if (req.nextUrl.searchParams.get('useroauth')) {
            const account = await Account.findOne({useroauth:req.nextUrl.searchParams.get('useroauth')})
            const listings = await Listing.find({seller:account._id})
            return new Response(JSON.stringify(listings),{status:200})
        }
    } catch (err) {
        return new Response("Failed request.",{status:500})
    }
}

