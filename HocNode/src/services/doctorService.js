import db from "../models";
require('dotenv').config()
import _, { reject } from 'lodash'
import emailSevice from '../services/emailService'

const MAX_NUMBER_SCHEDULE  = process.env.MAX_NUMBER_SCHEDULE

let getSuperDoctorHome = (typeInput) =>
{
    return new Promise(async (resolve,reject) => 
    {
        try {
            let users = await db.User.findAll({
                limit: typeInput,
                where: {roleId: 'R2'},
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']
                    },
                    {
                        model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']
                    },
                    {
                        model: db.Doctor_Infor,  attributes: ['clinicId'],
                        include: [
                            {model: db.Specialty, attributes: ['name']}
                        ]
                        
                    }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (error) {
            reject(e)
        }
    })
}

let getFullDoctors = () =>
{
    return new Promise ( async (resolve,reject) => 
    {
        try {
            let doctors = await db.User.findAll({
                where: {
                    roleId: 'R2'
                },
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}
let checkRequiredFields = (dataInput) => 
{
    let arr = ['doctorId', 'contentHTML', 'cotentMarkdown', 'actions', 'selectedPrice', 'selectedPayment'
    , 'selectedProvince', 'nameClinic', 'addressClinic', 'note', 'specialtyId']

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
let saveInfoDocService = (dataInput) =>
{
    return new Promise (async (resolve,reject) => 
    {
        try {

            let checkObj = checkRequiredFields(dataInput)
            if (checkObj.isValid === false)
            {
                resolve({
                    errCode: 1,
                    errMessage: `Missing parameter: ${checkObj.element} `
                })
            }
            else
            {
                if (dataInput.actions === 'CREATE')
                {
                    await db.Markdown.create({
                        contentHTML: dataInput.contentHTML,
                        contentMarkdown: dataInput.cotentMarkdown,
                        description: dataInput.description,
                        doctorId: dataInput.doctorId
                    })
    
                }
                else if (dataInput.actions === 'EDIT')
                {
                    let dtMarkdown = await db.Markdown.findOne({
                        where: {
                            doctorId : dataInput.doctorId
                        },
                        // hiểu là squelize object
                        raw: false
                    })
                    if (dtMarkdown)
                    {
                        dtMarkdown.contentHTML = dataInput.contentHTML
                        dtMarkdown.contentMarkdown = dataInput.cotentMarkdown
                        dtMarkdown.description = dataInput.description
                        dtMarkdown.updateAt = new Date()
                
                        // bắt buộc phải raw false 
                        await dtMarkdown.save()
        
                    }
                    else
                    {
                        resolve('Error')
                    }
                }    
                
                let doctorInfor = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: dataInput.doctorId
                    }, 
                    raw: false
                })

                if (doctorInfor) {
                    doctorInfor.doctorId = dataInput.doctorId
                    doctorInfor.priceId = dataInput.selectedPrice
                    doctorInfor.provinceId = dataInput.selectedProvince
                    doctorInfor.paymentId = dataInput.selectedPayment

                    doctorInfor.nameClinic = dataInput.nameClinic
                    doctorInfor.addressClinic = dataInput.addressClinic
                    doctorInfor.note = dataInput.note
                    doctorInfor.specialtyId = dataInput.specialtyId
                    doctorInfor.clinicId = dataInput.clinicId
                    doctorInfor.updateAt = new Date()
                
                        // bắt buộc phải raw false 
                    await doctorInfor.save()
                }
                else{
                    //create
                    await db.Doctor_Infor.create({
                        doctorId: dataInput.doctorId,
                        priceId: dataInput.selectedPrice,
                        provinceId: dataInput.selectedProvince,
                        paymentId: dataInput.selectedPayment,
                        nameClinic: dataInput.nameClinic,
                        addressClinic: dataInput.addressClinic,
                        specialtyId : dataInput.specialtyId,
                        clinicId: dataInput.clinicId,
                        note : dataInput.note
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save doctors success !'
                })
            }
            
         
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailDoctorForIdService=  (id) =>
{
    return new Promise (async (resolve,reject) => 
    {
         
        try {
            if (!id)
            {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter !'
                 })
                
            }
            else
            {

                let data = await db.User.findOne({
                    where: {
                        id:id
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    // lấy thông tin trong bảng user và thấy thông tin của nó trong bảng Markdown
                    include: [
                        {
                            model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        {
                            model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']
                        },
                        {
                            model: db.Doctor_Infor,
                            attributes:
                            {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                {model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi']},
                                {model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi']},
                                {model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi']},
                                {model: db.Specialty, attributes: ['name']}
                            ]
                        }
                    ],
                    
                    raw: false,
                    // nest gôm nhóm lại
                    nest: true
                })


                if (data && data.image) 
                {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }

                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                 })

            }
            
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailMardownForIdService = (id) =>
{
    return new Promise (async (resolve,reject) => 
    {
        try {
            if (!id)
            {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter !'
                 })
                
            }
            else
            {

                let data = await db.Markdown.findOne({
                    where: {
                        doctorId:id
                    },
                    raw: false,
                    // nest gôm nhóm lại
                    nest: true
                })

                resolve({
                    errCode: 0,
                    data: data
                 })

            }
            
        } catch (error) {
            reject(error)
        }
    })
}

let bulkCreateScheduleService = (data) => 
{
    return new Promise (async (resolve,reject) => 
    {
        try {
            if (!data.scheduleArr || !data.doctorId || !data.date)
            {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing param !'
                })
            }

            else
            {
                let scheduleData = data.scheduleArr
                if (scheduleData && scheduleData.length > 0)
                {
                    scheduleData = scheduleData.map((item, index) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE
                        return item
                    })
                }

                let exits = await db.Schedule.findAll({
                    where: {doctorId : data.doctorId , date : data.date},
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw:true
                    }
                )
                // if (exits && exits.length > 0)
                // {
                //     exits = exits.map((item, index) => {
                //         item.date = new Date(item.date).getTime()
                //         return item
                //     })
                // }
                // so sánh: a là scheduleData b là exits
                let toCreate = _.differenceWith(scheduleData, exits, (a,b) => {
                    return a.timeType === b.timeType && +a.date === +b.date
                })
    
                if (toCreate && toCreate.length > 0)
                {
                    await db.Schedule.bulkCreate(toCreate)
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Crate OK'
                })
            }
        }   
        catch (error) {
            reject(error)
        }
    })
}


let getTimeDoctorOfDateService = (doctorId, date) => 
{
    return new Promise (async (resolve,reject) => 
    {
        try {
            if (!doctorId || !date)
            {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters'
                })
            }
            else
            {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                     // lấy thông tin trong bảng user và thấy thông tin của nó trong bảng Markdown
                    include: [
                        {
                            model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi']
                        },
                        {
                            model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName']
                        },
                    ],
                    
                    raw: false,
                    // nest gôm nhóm lại
                    nest: true
                })


                if (!data) data = []
                resolve({
                    errCode: 0,
                    data: data
                })
            }
         }
          
        catch (error) {
            reject(error)
        }
    })
}

let getMoreInforDoctorByIdService = (doctorId) =>
{
    return new Promise (async (resolve,reject) => 
    {
        try {
            if (!doctorId)
            {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters'
                })
            }
            else
            {
                // find all ==> array
                // findone ==> object
                let data = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: doctorId
                    }, 
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        {model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi']},
                        {model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi']},
                        {model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi']},
                        {
                            model: db.Specialty, attributes:['name']
                        }
                    ],
                    raw: false,
                    nest: true
                })


                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                })
            }
         
        }
          
        catch (error) {
            reject(error)
        }
    })
}

let getProfileDoctorByIdService = (inputId) =>
{
    return new Promise (async (resolve,reject) => 
    {
        try {
            if (!inputId)
            {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters'
                })
            }

 
            else
            {
                let data = await db.User.findOne({
                    where: {
                        id:inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    // lấy thông tin trong bảng user và thấy thông tin của nó trong bảng Markdown
                    include: [
                        {
                            model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']
                        },
                        {
                            model: db.Doctor_Infor,
                            attributes:
                            {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                {model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi']},
                                {model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi']},
                                {model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi']},
                            ]
                        },
                        {
                            model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown']
                        }
                    ],
                    
                    raw: false,
                    // nest gôm nhóm lại
                    nest: true
                })


                if (data && data.image) 
                {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }

                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                 })

            }
        }
          
        catch (error) {
            reject(error)
        }
    })
}


let getPatientOfDoctorService = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        if (!doctorId || !date)
        {
            resolve({
                errCode: 1,
                errMessage: 'Missing parameters'
            })
        }
        else
        {
            let data = await db.Booking.findAll({
                where: {
                    statusId: 'S2',
                    doctorId: doctorId,
                    date: date
                },
                include: [
                    {
                        model: db.User, as : 'patientData', attributes: ['email', 'firstName', 'address', 'gender'],
                        include: [
                            {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']}
                        ]
                    },
                    {
                        model: db.Allcode, as : 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi'],
                    }
                    
                ],
                // squelize object
                raw: false,
                // nest gôm nhóm lại
                nest: true
            })


            resolve({
                errCode: 0,
                data: data
             })
        }
    })
}


let sendRemedyService = (data) => {
    return new Promise(async (resolve, reject) => {
        if (!data.email || !data.doctorId || !data.patientId || !data.timeType)
        {
            resolve({
                errCode: 1,
                errMessage: 'Missing parameters'
            })
        }
        else
        { 
            // update patient status
            let appointment = await db.Booking.findOne({
                where: {
                    doctorId: data.doctorId,
                    patientId: data.patientId,
                    timeType: data.timeType,
                    statusId: 'S2'
                },
                raw: false
            })

            if (appointment){
                appointment.statusId = 'S3'
                await appointment.save()
            }

            // send email remedy
            await emailSevice.sendAttachment(data)
            resolve({
                errCode: 0,
                errMessage: 'Good'
             })
        }
    })
}
module.exports = {
    getSuperDoctorHome: getSuperDoctorHome,
    getFullDoctors: getFullDoctors,
    saveInfoDocService: saveInfoDocService,
    getDetailDoctorForIdService:getDetailDoctorForIdService,
    getDetailMardownForIdService: getDetailMardownForIdService,
    bulkCreateScheduleService: bulkCreateScheduleService,
    getTimeDoctorOfDateService: getTimeDoctorOfDateService,
    getMoreInforDoctorByIdService: getMoreInforDoctorByIdService,
    getProfileDoctorByIdService: getProfileDoctorByIdService,
    getPatientOfDoctorService:getPatientOfDoctorService,
    sendRemedyService: sendRemedyService
}