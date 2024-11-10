import express from 'express'
import controllers from '../controller/indexcontroller.js'

const UseRoutes = express.Router()
UseRoutes.get('/', controllers.index)
UseRoutes.get('/add', controllers.addget)
UseRoutes.get('/edit/:id', controllers.editget)
UseRoutes.post('/edit/:id', controllers.editpost)
UseRoutes.post('/add', controllers.addpost)
UseRoutes.post('/delete/:id', controllers.deletedata)
export default UseRoutes



