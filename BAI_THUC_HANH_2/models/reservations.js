import mongoose, { Types } from "mongoose"

const reservationsModel = mongoose.Schema({
   
        date: {type: String,
            request: true,
        },
        time: {
            type: String,
            request: true
        },
        number: {
            type: Number,
            default: 1,
        }
    
})

const reserData = mongoose.model("users", reservationsModel)

export default reserData