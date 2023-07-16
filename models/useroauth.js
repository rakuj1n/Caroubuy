import { Schema, model, models } from 'mongoose'

const userOAuthSchema = new Schema({
    email: {type:String,unique:[true,'Email already exists.'],required:[true,'Email is required.']},
    username: {type:String,required:[true,'Username is required.']},
    image: {type:String},
    account: {type:Schema.Types.ObjectId,ref:"Account"}
},{timestamps:true})

const UserOAuth = models.UserOAuth || model('UserOAuth',userOAuthSchema)

export default UserOAuth