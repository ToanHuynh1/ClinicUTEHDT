var bcrypt = require('bcryptjs');
import e from 'express';
import db from '../models';
var salt = bcrypt.genSaltSync(10);
let createNewUser =async (data) =>
{
    return new Promise(async (resolve,reject) =>
    {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                rating: 0
            })
            resolve('Create thành công')
        } catch (error) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) =>
{
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            // resolve in ket qua ==> tuong tu nhu console log
            resolve(hashPassword) 
        } catch (error) {
            reject(error)
        }
    })
}


let getAllUser = () =>
{
    return new Promise(async (resolve, reject) =>
    {
        try {
            let users = db.User.findAll({
                raw: true,
            })
            console.log(users)
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let getUserInfoById = (userId) =>
{
    return new Promise(async (resolve,reject) =>
    {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                }, 
                raw: true
            })

            if (user){
                resolve(user)
            }

            else
            {
                resolve([])
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) =>
{
    return new Promise (async(resolve,reject) =>
    {
        try {
            let user = await db.User.findOne({
                where: {
                    id : data.id
                }
            })

            if (user)
            {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save()

                resolve()
            }
            else
            {
                resolve('Loi')
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUserById = (userId) =>
{
    return new Promise(async(resolve,reject) =>
    {
        try {
            let user = await db.User.findOne({
                where: {
                    id : userId
                }
            })

            if (user)
            {
                await user.destroy()
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = 
{
    createNewUser: createNewUser,
    getAllUser:getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}