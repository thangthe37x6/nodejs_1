import express from 'express'
import apiUserController from "../controller/apiUserController.js"
const APIRoutes = express.Router()

APIRoutes.get("/api/v1/userss", apiUserController.userAPI)
APIRoutes.get("/api/v1/userss/:id", apiUserController.show)
APIRoutes.get("/api/v1/delete/:id", apiUserController.deleteUser)

export default APIRoutes;