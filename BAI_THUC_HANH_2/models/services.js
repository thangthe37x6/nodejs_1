import mongoose, { Types } from "mongoose"

const Services = mongoose.Schema({
   
        name: {type: String,
            request: true,
        },
        description: {
            type: String,
            request: true
        }
    
})

const ServicesData = mongoose.model("service", Services )

export default ServicesData