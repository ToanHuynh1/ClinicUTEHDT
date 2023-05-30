import e from "express"
import db from "../models"

let checkRequiredFields = (dataInput) => {
    let arr = ['name', 'descriptionHTML', 'descriptionMardown', 'image']

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
    createNewSpecialtyService : (data) => {
        return new Promise (async (resolve,reject) => {
            try {
                if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMardown)
                {
                    resolve({
                        errCode:1,
                        errMessage: "Missing parameter"
                    })
                }
                else
                {
                    await db.Specialty.create(
                        {
                            image: data.imageBase64,
                            name: data.name,
                            descriptionHTML: data.descriptionHTML,
                            descriptionMardown: data.descriptionMardown,
                            rating: 0
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
    
     getAllSpecialtyService :  () => {
        return new Promise (async (resolve,reject) => {
            try {
                let data = await db.Specialty.findAll()
                if (data && data.length > 0)
                {
                    data.map(item =>{
                        item.image = new Buffer(item.image, 'base64').toString('binary')
                        return item
                    } 
                    )  
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Yep',
                    data
                })
            }
               catch (error) {
                reject(error)
            }
        })
    },
    
    getDetailSpecialtyService : (inputDataId, location) => {
        return new Promise (async (resolve,reject) => {
            try {
               
                if (!inputDataId || !location)
                {
                    resolve({
                        errCode: 1,
                        errMessage: 'Missing parameter',
                    })
                }
                else
                {
               
                    let  result = await db.Specialty.findOne({
                            where: {
                                id: inputDataId
                            },
                            attributes: ['descriptionHTML', 'descriptionMardown'],
                            raw: true,
                            nest: true
                          
                        })
    
                        if (result)
                        {
                            let doctorSpecialty = []
                            if (location === 'ALL')
                            {
                                doctorSpecialty = await db.Doctor_Infor.findAll({
                                    where: {
                                        specialtyId: inputDataId,
                                    },
                                    attributes: ['provinceId', 'doctorId']
                                })
                            }
    
                            else
                            {
                                doctorSpecialty = await db.Doctor_Infor.findAll({
                                    where: {
                                        specialtyId: inputDataId,
                                        provinceId: location
    
                                    },
                                    attributes: ['provinceId', 'doctorId']
                                })
                            }
                       
                            
                            result.doctorSpecialty = doctorSpecialty
                        }
                        else
                        {
                            result = {}
                        }
                        resolve({
                            errCode: 0,
                            errMessage: 'Yep',
                            result
                        })
        
                }
            }
               catch (error) {
                reject(error)
            }
        })
    }, 
    updateSpecialtyService: (data) => {
        return new Promise (async (resolve,reject) => {
            try {

                if (!data.id || !data.name || !data.descriptionMardown || !data.descriptionHTML)
                {
                    resolve({
                        errCode:2,
                        errmessage: 'Phải điền đầy đủ thông tin'
                    })
                }
                let dataSpecialty = await db.Specialty.findOne({
                    where: {
                        id : data.id
                    },raw: false
                    
                })
                if (dataSpecialty)
                {
                    dataSpecialty.name = data.name,
                    dataSpecialty.descriptionMardown= data.descriptionMardown,
                    dataSpecialty.descriptionHTML = data.descriptionHTML
    
                    if (data.imageBase64)
                    {
                        dataSpecialty.image = data.imageBase64
                    }
                    await dataSpecialty.save()
                    resolve({
                        errCode:0,
                        errMessage: 'Cập nhật chuyên khoa thành công'
                    })
                }
                else
                {
                    resolve({
                        errCode: 1,
                        errmessage: 'Không tìm thấy chuyên khoa'
                    })
                }
            } catch (error) {
                reject(error)
            }
            
        });
    },


    handleDeleteSpecialtyService: async (dataId) =>
    {
        return new Promise(async (resolve,reject) =>{

            let dataSpecialty = await db.Specialty.findOne({
                where: {
                    id : dataId
                }
            })

            if (!dataSpecialty){
           
                resolve({
                    errCode: 2,
                    errMessage: "Chuyên khoa không tồn tại"
                })
                
            }

            else
            {
                let dataDoctor_infor = await db.Doctor_Infor.findOne({
                    where: {
                        specialtyId: dataId
                    }
                })
        
                if (dataDoctor_infor)
                {
                    dataDoctor_infor.specialtyId = ''
                    await dataDoctor_infor.save()
                }
        

                await db.Specialty.destroy({
                    where: {
                        id: dataId
                    }
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Xóa chuyên khoa thành công'
                })
            }

          
        })
    },

    getSuperSpecialtyHome: (typeInput) =>
    {
        return new Promise(async (resolve,reject) => 
        {
            try {
                let data = await db.Specialty.findAll({  
                    limit: typeInput,
                    order: [['rating', 'DESC']],
                })
                if (data && data.length > 0)
                {
                    data.map(item =>{
                        item.image = new Buffer(item.image, 'base64').toString('binary')
                        return item
                    } 
                    )  
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Yep',
                    data
                })
            }
               catch (error) {
                reject(error)
            }
        })
    },

    handleReviewSpecialtyService: async (data) =>
    {
        return new Promise(async (resolve,reject) => 
        {
            try {

                if (!data.patientId || !data.rating) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Bạn chưa đăng nhập hoặc đánh giá',
                    })
                }

                else
                {
                     await db.Review_specialty.create({
                        patientId: data.patientId,
                            rating: data.rating,
                            specialtyId: data.specialtyId
                        })
    
                    }


                    await handleUpdateRating(data.specialtyId)

                    resolve({
                        errCode: 0,
                        errMessage: 'Cập nhật đánh giá thành công',
                    })
                }  
               catch (error) {
                reject(error)
            }
        })
    },
}

let handleUpdateRating = async (id) =>
{
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: '',
                })
            } else {
                let dataReviewRatingSpecialty = await db.Review_specialty.findAll({
                    where: {
                      specialtyId: id,
                    },
                    attributes: ['rating'],
                    raw: true // Chỉ lấy trường "rating"
            });
          
            let totalRating = dataReviewRatingSpecialty.reduce((total, data) => total + data.rating, 0);
          
            let averageRating = totalRating / dataReviewRatingSpecialty.length;
          
            let roundedAverageRating = Math.ceil(averageRating);
          
            let dataSpecialty = await db.Specialty.findOne({
                where: {
                    id: id
                },
                    attributes: ['rating', 'id'],
                    raw: false
                })
          
            if (dataSpecialty) {
                dataSpecialty.rating = roundedAverageRating
                await dataSpecialty.save()
            }
        }
    } catch (error) {
        console.log(error);
   }
}
