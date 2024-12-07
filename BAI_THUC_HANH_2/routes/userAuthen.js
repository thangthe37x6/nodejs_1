import autheUser from "../controllers/autheControl.js";
import express from "express"

const routesUser = express.Router()

routesUser.post("/auth/register", autheUser.register)
routesUser.post("/auth/login", autheUser.login)

export default routesUser