import mongoose from "mongoose";

const Schema = mongoose.Schema

const fucaltySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    numberof: {
        type: Number,
        require: true
    }
})

const fucalty = mongoose.model("Fucalty", fucaltySchema)


export default fucalty



