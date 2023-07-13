import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery')

    if (isConnected) {
        console.log('MongoDB is alraedy connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:'caroubuy',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true

        console.log('MongoDB connected')
    } catch (err) {
        console.log(err)
    }
}