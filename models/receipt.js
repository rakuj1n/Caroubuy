import { Schema, models, model } from "mongoose";

const receiptSchema = new Schema({
    account: {type:Schema.Types.ObjectId,ref:'Account'},
    successPurchase: [{type:Schema.Types.ObjectId,ref:'Listing'}],
    errorPurchase: [{type:Schema.Types.ObjectId,ref:'Listing'}],
},{timestamps:true})

const Receipt = models.Receipt || model('Receipt',receiptSchema)

export default Receipt