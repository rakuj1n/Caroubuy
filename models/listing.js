import { Schema, models, model } from "mongoose";

const listingSchema = new Schema({
    listingname: {type:String,required:true},
    listingdescription: {type:String, required:true},
    listingthumbnail: {type:String,required:true},
    listingprice: {type: String, required:true},
    seller: {type:Schema.Types.ObjectId,ref:'Account',required:true},
    buyer: {type:Schema.Types.ObjectId,ref:'Account'},
    checkedOut: {type:Schema.Types.ObjectId,ref:'Account'},
    favby: [{type:Schema.Types.ObjectId,ref:'Account'}]
},{timestamps:true})

const Listing = models.Listing || model('Listing',listingSchema)

export default Listing