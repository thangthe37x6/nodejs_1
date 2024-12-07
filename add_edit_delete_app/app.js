import express from 'express'
import bodyParser from "body-parser"
import  connectDB from './config/dataset.config.js'
import UseRoutes from './routes/index.mjs'
import APIRoutes from './routes/api.mjs'
const app = express()

connectDB()
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', UseRoutes)
app.use('/', APIRoutes)



app.listen(3000, () => {
    console.log("server is running on http://localhost:3000")
})