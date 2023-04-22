import db from "../models"
let bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


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


let handleUserLogin = (email, password) =>
{
    return new Promise(async(resolve, reject) =>{
        try {
            let userData = {}
            let isExit = await checkUserEmail(email)
            if(isExit)
            {
                let user =await db.User.findOne({
                    attributes:  ['id','email','roleId', 'password', 'firstName', 'lastName'],
                    where: {
                        email: email
                    },
                    raw: true
                })

                if (user)
                {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check)
                    {
                        userData.errCode = 0
                        userData.errMessage = 'Đăng nhập thành công'
                        delete user.password
                        userData.user = user
                    }
                    else
                    {
                        userData.errCode = 3
                        userData.errMessage = 'Password không chính xác'
                    }
                }
              
                else
                {
                    userData.errCode = 2
                    userData.errMessage = 'User không tìm thấy'
                }
            }
            else
            {
                userData.errCode = 1
                userData.errMessage = 'Không tìm thấy Email'
            }

            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}


let checkUserEmail = (userEmail) =>
{
    return new Promise(async (resolve, reject) =>
    {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
                })
                if(user){
                    resolve(true)
                }
                else
                {
                    resolve(false)
                }
        } catch (error) 
        {
            reject(error)
        }
    })
}

let getAllUsers = (userId) =>
{
    return new Promise( async(resolve,reject) => {
        try {
            let users = ''
            if (userId === 'ALL'){
                users =await db.User.findAll({
                attributes: {
                    exclude: ['password']
                }
                })
            } 

            if (userId && userId !== 'ALL')
            {
                users = await db.User.findOne({
                    where: {
                        id : userId
                    },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}


let createNewUser= (data) => {
    return new Promise( async (resolve,reject) =>{
        try {
                let check = await checkUserEmail(data.email)
                
                if (check == true)
                {
                    resolve({
                        errCode: 1,
                        errMessage: 'Email đã được sử dụng, vui lòng sử dụng email khác'
                    })
                }
                else{
                    let hashPasswordFromBcrypt = await hashUserPassword(data.password)

                    await db.User.create({
                        email: data.email,
                        password: hashPasswordFromBcrypt,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phonenumber: data.phoneNumber,
                        gender: data.gender,
                        roleId: data.role,
                        positionId: data.position,
                        image: data.image
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'OK'
                    })
                }
               
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) =>
{
    return new Promise(async (resolve,reject) =>{
        let user = await db.User.findOne({
            where: {
                id: userId
            }
        })

        if (!user)
        {
            resolve({
                errCode: 2,
                errMessage: "Người dùng không tồn tại"
            })
        }
        
        await db.User.destroy({
            where: {
                id: userId
            }
        })

        resolve({
            errCode: 0,
            errMessage: 'Xóa người dùng thành công'
        })
    })
}

let updateUserData = (data) =>
{
    return new Promise(async (resolve,reject) => {
        try {
            if (!data.id || !data.role || !data.position || !data.gender)
            {
                resolve({
                    errCode:2,
                    errmessage: 'Phải điền đầy đủ thông tin'
                })
            }
            let user = await db.User.findOne({
                where: {
                    id : data.id
                },raw: false
                
            })
            if (user)
            {
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address= data.address,
                user.roleId = data.role,
                user.positionId = data.position,
                user.gender =data.gender,
                user.phonenumber = data.phonenumber
                if (data.img)
                {
                    user.image = data.img
                }
                await user.save()
                resolve({
                    errCode:0,
                    errMessage: 'Update người dùng thành công'
                })
            }
            else
            {
                resolve({
                    errCode: 1,
                    errmessage: 'Không tìm thấy người dùng'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCodeService = (typeInput) =>
{
    return new Promise(async (resolve,reject) => 
    {
        try {
            if (!typeInput)
            {
                resolve({
                    errCode: 1,
                    errMessage: "Thiếu tham số"
                })
            }
            else
            {
                let res = {}
                let allcode = await db.Allcode.findAll({
                    where: {type: typeInput}
                })
    
                res.errCode = 0
                res.data = allcode
                resolve(res)
            }
          
        } catch (error) {
            reject(error)
        }
    })
}


let handleUserSignup = (email, password, username) =>
{
    return new Promise(async(resolve, reject) =>{
        try {
            let isExit = await checkUserEmail(email)
            if(isExit)
            {
                resolve({
                    errCode: 1,
                    errMessage: 'Email đã tồn tại'
                })
        
            }
            else
            {
                let hashPasswordFromBcrypt = await hashUserPassword(password)
                await db.User.create({
                    email: email,
                    password: hashPasswordFromBcrypt,
                    firstName: username,
                    roleId: 'R3'
                })

                resolve({
                    errCode:0,
                    errMessage:" Đăng ký tài khoản thành công",
                })
             
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers:getAllUsers,
    createNewUser: createNewUser,
    deleteUser:deleteUser,
    updateUserData:updateUserData,
    getAllCodeService:getAllCodeService,
    handleUserSignup:handleUserSignup
}