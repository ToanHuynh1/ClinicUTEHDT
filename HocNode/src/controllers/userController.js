import db from "../models";
import userService from '../services/userService'

let handleLogin = async (req,res) =>
{
    let email = req.body.email
    let password = req.body.password

    if(!email || !password)
    {
        return res.status(500).json(
        {
            message: 'Vui lòng điền Email và Password',
            errCode: 1,
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : []
    })
 
}


let handleGetAllUsers = async (req,res) =>
{
    let id = req.query.id //ALL, ID

    if(!id)
    {
        return res.status(200).json
        ({
            errCode: 1,
            errMessage: 'Thiếu giá trị',
            users: []
        })
    }
    let users = await userService.getAllUsers(id)


    return res.status(200).json
    ({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req,res) =>
{
    let message = await userService.createNewUser(req.body)
    return res.status(200).json(message)
}

let handleEditUser= async (req,res) =>
{
   let data = req.body
   let message = await userService.updateUserData(data)
   return res.status(200).json(message)
}

let handleDeleteUser = async (req,res) => {

    if (!req.body.id) {
        return res.status(300).json({
            errCode: 1,
            errMessage: "Thiếu tham số"
        })
    }

    let message = await userService.deleteUser(req.body.id)

    return res.status(200).json(message)

}

let getAllCode  = async (req,res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json({
            error: -1,
            errMessage: "Lỗi từ server"
        })
    }
}

let handleSignup  = async (req,res) => {

    let username = req.body.username
    let email = req.body.email
    let password = req.body.password

    if (!username){
        return res.status(500).json(
            {
                message: 'Vui lòng điền tên đăng nhập',
                errCode: 1,
            })
    }
    if(!email)
    {
        return res.status(500).json(
        {
            message: 'Vui lòng điền Email',
            errCode: 1,
        })
    }

    if(!password)
    {
        return res.status(500).json(
        {
            message: 'Vui lòng điền mật khẩu',
            errCode: 1,
        })
    }

    let userData = await userService.handleUserSignup(email, password, username)
    
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
    })
 
}

let handleGetUserById = async (req,res) => {
    try {

        let data = await userService.handleGetUserByIdService(req.body.id);

        return res.status(200).json({data})
    } catch (error) {
        return res.status(200).json({
            error: -1,
            errMessage: "Lỗi từ server"
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers:handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser : handleEditUser,
    handleDeleteUser : handleDeleteUser,
    getAllCode: getAllCode,
    handleSignup: handleSignup,
    handleGetUserById:handleGetUserById
}