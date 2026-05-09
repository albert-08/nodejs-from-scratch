const UserService = require('../services/userService')

const userService = new UserService()

exports.getAllUsers = async (req, res) => {
    const users = await userService.getAll()
    res.status(200).json(users)
}

exports.getUser = async (req, res) => {
    const id = req.params.id
    const user = await userService.filterById(id)
    if (!user) {
        return res.status(400).json({'message': "Usuario no encontrado"})
    }
    res.status(200).json(user)
}

exports.createUser = async (req, res) => {
    try {
        let data = req.body
        await userService.create(data)
        res.status(201).send('Usuario creado')
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
    
}

exports.updateUser = (req, res) => {
    let data = req.body
    const { name, lastname, email, phone } = data
    console.log(req.params.id)
    console.log(name, lastname, email, phone)
    res.status(200).send('Usuario actualizado')
}

exports.deleteUser = (req, res) => {
    console.log(req.params.id)
    res.status(200).send('Usuario eliminado')
}