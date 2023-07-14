import { Schema, models, model } from "mongoose";

const accountSchema = new Schema({
    usermanual: {type:Schema.Types.ObjectId, ref:"UserManual"},
    useroauth: {type:Schema.Types.ObjectId, ref:"UserOAuth"},
    image: {type:String, default:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"},
    favitems: [{type:Schema.Types.ObjectId,ref:"Listing"}]
},{timestamps:true})

const Account = models.Account || model('Account', accountSchema)

export default Account