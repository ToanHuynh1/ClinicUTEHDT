var express = require('express');
import userController from '../controllers/userController';

let router = express.Router()
let initWebRoutesUser = (app) => {

    router.post('/api/login', userController.handleLogin)

    router.get('/api/get-all-users', userController.handleGetAllUsers)

    router.post('/api/create-new-user' , userController.handleCreateNewUser)

    router.put('/api/edit-user' , userController.handleEditUser)
    
    router.delete('/api/delete-user' , userController.handleDeleteUser)

    router.get('/api/allcode', userController.getAllCode)

    router.post('/api/signup', userController.handleSignup)

    router.post('/api/get-user-by-id' , userController.handleGetUserById)

    router.post('/api/modify-passowrd' , userController.handleModifyPassowrd)


    return app.use("/", router)
}

module.exports = initWebRoutesUser
