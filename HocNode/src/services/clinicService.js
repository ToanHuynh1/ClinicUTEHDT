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
                            descriptionMardown: data.descriptionMardown
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
    }
}


