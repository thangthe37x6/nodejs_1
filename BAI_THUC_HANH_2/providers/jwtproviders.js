import jwt from "jsonwebtoken"


const createToken = async (infor, secretkey, time) => {
    try {
        return jwt.sign(infor, secretkey, {expiresIn: time})
    } catch (error) {
        throw new Error(`Error generating token: ${error.message}`);
    }
}

const verifyToken = async (token, secretkey) => {
    try {
        return jwt.verify(token, secretkey)
    } catch (error) {
        throw new Error(`Error generating token: ${error.message}`);
    }
}
const jwtproviders = {createToken, verifyToken}
export default jwtproviders