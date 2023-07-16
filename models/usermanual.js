import { Schema, model, models } from "mongoose";
import bcrypt from 'bcrypt'

const userManualSchema = new Schema({
    email: {type:String, trim:true, lowercase:true, unique:[true,'Email already exists.'], required:[true,'Email is required.']},
    username: {type:String, unique:[true,'Username already exists.'], required:[true,'Username is required.']},
    password: {type:String, trim:true, minLength:8, required:[true,'Password is required.']},
    account: {type:Schema.Types.ObjectId,ref:"Account"} 
},{
    timestamps:true,
    toJSON: {
        transform: function(doc,ret) {
            delete ret.password
            return ret
        }
    }
})

userManualSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT_ROUNDS))
    return next()
})

const UserManual = models.UserManual || model('UserManual',userManualSchema)

export default UserManual