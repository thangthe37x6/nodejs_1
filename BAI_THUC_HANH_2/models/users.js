import mongoose, { Types } from "mongoose"

const usersModel = mongoose.Schema({
   
        username: {type: String,
            request: true,
        },
        password: {
            type: String,
            request: true
        }
    
})

const usersData = mongoose.model("users", usersModel)

export default usersData