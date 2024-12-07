import fucalty from '../model/fucalty.model.js'

class apiUserController {
    static async userAPI (req, res) {
        try {
            const users = await fucalty.find()

            res.status(200).json({message: "Loading dataset success", users: users})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    static async show(req, res) {
        try {
            const id = req.params.id
            const user = await fucalty.findById(id)
            res.status(200).json({message: "get one user", user: user})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    static async deleteUser(req, res) {
        try {
            let id = req.params.id
            let dl = await fucalty.deleteOne({_id, id})
            res.status(200).json({message: "delete data succes", dl})

        } catch (error) {
            res.status(500).send({message: error.message})
        } 
    }
}
export default apiUserController;