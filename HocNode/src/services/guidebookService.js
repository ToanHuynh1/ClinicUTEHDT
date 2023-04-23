import e from "express"
import db from "../models"

let checkRequiredFields = (dataInput) => {
    let arr = ['name', 'descriptionHTML', 'descriptionMardown', 'image', 'type']

    let check = true
    let element = ''
    for(let i = 0; i < arr.length ; i++)
    {
        if (!dataInput[arr[i]]){
            check = false
            element = arr[i]
            break
        }
    }

    return {
        isValid: check,
        element: element
    }
}
module.exports = {
    createNewGuidebookService : (data) => {
        return new Promise (async (resolve,reject) => {
            try {
                if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMardown || !data.type)
                {
                    resolve({
                        errCode:1,
                        errMessage: "Missing parameter"
                    })
                }
                else
                {
                    await db.Guidebook.create(
                        {
                            image: data.imageBase64,
                            name: data.name,
                            descriptionHTML: data.descriptionHTML,
                            descriptionMardown: data.descriptionMardown,
                            type: data.type
                        }
                    )
    
                    resolve({
                        errCode: 0,
                        errMessage: "OK"
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    },


    handleGetAllGuidebookService: (guidebookId) =>
    {
        return new Promise( async(resolve,reject) => {
            try {
                let guidebooks = []
                if (guidebookId.id === 'ALL'){
                    guidebooks =await db.Guidebook.findAll()

                    // if (guidebooks && guidebooks.length > 0)
                    // {
                    //     guidebooks.map(item =>{
                    //         item.image = new Buffer(item.image, 'base64').toString('binary')
                    //         return item
                    //     } 
                    //     )  
                    // }
                } 
    
                if (guidebookId.id && guidebookId.id !== 'ALL')
                {
                    guidebooks = await db.Guidebook.findOne({
                        where: {
                            id : guidebookId.id
                        },
                    })

                    // if (guidebooks && guidebooks.length > 0)
                    // {
                    //     guidebooks.map(item =>{
                    //         item.image = new Buffer(item.image, 'base64').toString('binary')
                    //         return item
                    //     } 
                    //     )  
                    // }
                }
    
                resolve(guidebooks)
            } catch (error) {
                reject(error)
            }
        })
    }, 



    handleUpdateGuidebookService: (data) =>
    {
    return new Promise (async(resolve,reject) =>
    {
        try {

            if (!data.id || !data.name || !data.descriptionMardown	|| !data.type || !data.descriptionHTML)
            {
                resolve({
                    errCode:2,
                    errmessage: 'Phải điền đầy đủ thông tin'
                })
            }
            let guidebook = await db.Guidebook.findOne({
                where: {
                    id : data.id
                },raw: false
                
            })
            if (guidebook)
            {
                guidebook.name = data.name,
                guidebook.type = data.type,
                guidebook.descriptionMardown= data.descriptionMardown,
                guidebook.descriptionHTML = data.descriptionHTML

                if (data.image)
                {
                    guidebook.image = data.image
                }
                await guidebook.save()
                resolve({
                    errCode:0,
                    errMessage: 'Cập nhật cẩm nang thành công'
                })
            }
            else
            {
                resolve({
                    errCode: 1,
                    errmessage: 'Không tìm thấy cẩm nang'
                })
            }
        } catch (error) {
            reject(error)
        }
        })
    }, 

    handleGetGuidebookByTypeService: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.type) {
                    resolve({
                        errCode: 2,
                        errmessage: 'Phải điền đầy đủ thông tin'
                    });
                }
                let guidebook = await db.Guidebook.findAll({
                    where: {
                        [db.Sequelize.Op.and]: [
                            { type: data.type },
                            { id: { [db.Sequelize.Op.ne]: data.id } }
                        ]
                    },
                    raw: false
                });
                resolve(guidebook);
            } catch (error) {
                reject(error);
            }
        });
    },
    
}
