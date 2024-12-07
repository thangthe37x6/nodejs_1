import express from "express"
import connectDB from "./config/mgdb.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import routesUser from "./routes/userAuthen.js"
dotenv.config()

const PORT =  process.env.PORT || 3000
const app = express()
connectDB()
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use("/", routesUser)



app.listen(PORT, (req, res) => {
    console.log(`http://localhost:${PORT}/login`)
})

