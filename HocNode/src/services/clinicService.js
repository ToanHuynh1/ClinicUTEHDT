import db from "../models"


module.exports = {
    createNewClinicService : (data) => {
        return new Promise (async (resolve,reject) => {
            try {
                if (!data.name || !data.imageBase64 || !data.descriptionHTML 
                    || !data.descriptionMardown
                    || !data.address
                    )
                {
                    resolve({
                        errCode:1,
                        errMessage: "Missing parameter"
                    })
                }
                else
                {
                    await db.Clinic.create(
                        {
                            image: data.imageBase64,
                            name: data.name,
                            address: data.address,
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
    getAllClinicService: (data) => {
        return new Promise (async (resolve,reject) => {
            try {
                let data = await db.Clinic.findAll()
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
    getDetailClinicService:  (inputDataId) => {
        return new Promise (async (resolve,reject) => {
            try {
               
                if (!inputDataId)
                {
                    resolve({
                        errCode: 1,
                        errMessage: 'Missing parameter',
                    })
                }
                else
                {
               
                    let  result = await db.Clinic.findOne({
                            where: {
                                id: inputDataId
                            },
                            attributes: ['address','name','image','descriptionHTML', 'descriptionMardown'],
                            raw: true,
                            nest: true
                          
                        })
    
                        if (result)
                        {
                            let doctorClinic = []
                       
                            doctorClinic = await db.Doctor_Infor.findAll({
                                where: {
                                    clinicId: inputDataId,
                                },
                                    attributes: ['provinceId', 'doctorId']
                                })
                            
                            result.doctorClinic = doctorClinic
                        
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
    handleDeleteClinicService: async (dataId) =>
    {
        return new Promise(async (resolve,reject) =>{

            let dataClinic = await db.Clinic.findOne({
                where: {
                    id : dataId
                }
            })

            if (!dataClinic){
           
                resolve({
                    errCode: 2,
                    errMessage: "Phòng khám không tồn tại"
                })
                
            }

            else
            {
                let dataDoctor_infor = await db.Doctor_Infor.findOne({
                    where: {
                        clinicId: dataId
                    }
                })
        
                if (dataDoctor_infor)
                {
                    dataDoctor_infor.clinicId = ''
                    await dataDoctor_infor.save()
                }
        

                await db.Clinic.destroy({
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

    handleReviewClinicService: async (data) =>
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
                     await db.Review_clinic.create({
                            patientId: data.patientId,
                            rating: data.rating,
                            clinicId: data.clinicId
                        })
    
                    }

                    await handleUpdateRatingClinic(data.clinicId)

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

    getSuperClinicHome: (typeInput) =>
    {
        return new Promise(async (resolve,reject) => 
        {
            try {

                let data = await db.Clinic.findAll({  
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

}


let handleUpdateRatingClinic = async (id) =>
{
        try {
            console.log(id)
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: '',
                })
            } else {
                let dataReviewRatingClinic = await db.Review_clinic.findAll({
                    where: {
                      clinicId: id,
                    },
                    attributes: ['rating'],
                    raw: true // Chỉ lấy trường "rating"
            });
          
            let totalRating = dataReviewRatingClinic.reduce((total, data) => total + data.rating, 0);
          
            let averageRating = totalRating / dataReviewRatingClinic.length;
          
            let roundedAverageRating = Math.ceil(averageRating);
          
            let dataClinic = await db.Clinic.findOne({
                where: {
                    id: id
                },
                    attributes: ['rating', 'id'],
                    raw: false
                })
          
            if (dataClinic) {
                dataClinic.rating = roundedAverageRating
                await dataClinic.save()
            }
        }
    } catch (error) {
        console.log(error);
   }

}




