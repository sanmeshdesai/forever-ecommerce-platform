import {v2 as cloudinary} from "cloudinary"

const coonnectCloudinary = async() => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEYS,
        api_secret: process.env.CLOUDINARY_SECRET_KEY 
    })
}

export default coonnectCloudinary