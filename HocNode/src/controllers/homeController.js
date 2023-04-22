import db from '../models/index'
import CRUDService from '../services/CRUDService'

let getHomePage = async (req,res) =>
{
    try {
        let data = await db.User.findAll()
        return res.render('homepage.ejs',
        {
            data: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error)
    }   
}

let getCRUD =  (req,res) =>
{   
    return res.render('crud.ejs')  
}


let postCRUD = async (req,res) => 
{
    let message =  await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('post new user')
}


let displayGetCRUD =async (req,res) =>
{
    let data = await CRUDService.getAllUser()
    return res.render('displayCRUD.ejs',{
        dataTable: data,
    })
}


let getEditGetCRUD =async (req,res) =>
{
    let  userId = req.query.id 
    
    if (userId)
    {
        let userData =await CRUDService.getUserInfoById(userId)
       
        if (userData)
        {
            return res.render('editCRUD.ejs', {
                user: userData,
            })
        }
    }
    else
    {
        return res.send('user not found !!!')
    }
     
}

let putCRUD = async (req,res) =>
{
    let data = req.body
    await CRUDService.updateUserData(data)
    return res.send('Update done')
    
}

let deleteCRUD = async (req,res) =>
{
    let id = req.query.id
    console.log(id)
    if (id)
    {
        await CRUDService.deleteUserById(id)
        return res.send('Delete done')
    }
    else
    {
        return res.send('Không tìm thấy')
    }

}


module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD:displayGetCRUD,
    getEditGetCRUD:getEditGetCRUD,
    putCRUD: putCRUD,
    deleteCRUD:deleteCRUD,
}