import db from "../models";
require('dotenv').config()
import _ from 'lodash'
import emailService from './emailService'
var bcrypt = require('bcryptjs');
import { v4 as uuidv4 } from 'uuid';
var salt = bcrypt.genSaltSync(10);
let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result
}

let bookAppointmentService = (data) => {
    return new Promise(async (resolve,reject) => 
    {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date 
                || !data.fullName  || !data.selectedGender || !data.address )
            {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else
            {
                let token = uuidv4()
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                      email: data.email,
                      roleId: 'R3',
                      gender: data.selectedGender,
                      address: data.address,
                      firstName: data.fullName
                    }
                  });

                  if (user && user[0] ){
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date : data.date,
                            timeType: data.timeType, 
                            token: token
                        }
                    })
                  }
                  resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed'
                  })
            }
        } catch (error) {
            reject(error)
        }
    })
}


let verifyBookAppointmentService = (data) => {
    return new Promise(async (resolve,reject) => 
    {
        try {
            if (!data.token || !data.doctorId)
            {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else
            {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    // raw = false mới dùng được hàm update
                    // raw = true trả về object của JS
                    raw: false
                })
               
                if (appointment){
                    appointment.statusId = 'S2'
                    await appointment.save()

                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment succeed !'
                    })
                }

                else
                {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or dose not exist !'
                    })
                }
                
            }
        } catch (error) {
            reject(error)
        }
    })
}

let ForgotPasswordPatientService = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Check if the email parameter is missing
        if (!data.email) {
          resolve({
            errCode: 1,
            errMessage: 'Thiếu thông tin: email'
          })
        } else {
          // Check if the email belongs to a registered user
          let user = await db.User.findOne({
            where: { email: data.email },
            attributes: {
                exclude: ['password']
            },
            raw: false
          })

          if (!user) {
            resolve({
              errCode: 2,
              errMessage: 'Không tìm thấy người dùng'
            })
          } else {
            // Generate a random verification code and save it to the user's record in the database
            let verificationCode = Math.floor(Math.random() * 1000000)
            user.verificationCode = verificationCode

            await user.save()
  
            // Send an email to the user with the verification code
            await emailService.sendForgotpassword({
              email: data.email,
              recipientName: user.firstName,
              verificationCode: verificationCode,
              language: data.language
            })
  
            resolve({
              errCode: 0,
              errMessage: 'Mã code đã được gửi',
              user
            })
          }
        }
      } catch (error) {
        reject(error)
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



  let ConfirmPasswordService = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(data)
        // Check if the email parameter is missing
        if (!data.otp) {
          resolve({
            errCode: 1,
            errMessage: 'Thiếu mã: OTP'
          })
        } else {
          // Check if the email belongs to a registered user
          let user = await db.User.findOne({
            where: { id: data.id },
            attributes: {
                exclude: ['password']
            },
            raw: false
          })

          if (!user) {
            resolve({
              errCode: 2,
              errMessage: 'Không tìm thấy người dùng'
            })
          } else {

            if (data.otp !== user.verificationCode)
            {
                resolve({
                    errCode: 2,
                    errMessage: 'Mã OTP không chính xác'
                })
            }
            else
            {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password1)
                user.password = hashPasswordFromBcrypt
                await user.save()
                resolve({
                    errCode: 0,
                    errMessage: 'Đã cập nhật lại mật khẩu',
                    user
                  })
            }
        
          }
        }
      } catch (error) {
        reject(error)
      }
    })
  }
 
let getBookingByIdService = (patientId) => {
  return new Promise(async (resolve,reject) => 
  {
      try {
          if (!patientId)
          {
              resolve({
                  errCode: 1,
                  errMessage: 'Missing parameter'
              })
          }
          else
          {
              let appointment = {}
              appointment = await db.Booking.findAll({
                  where: {
                      patientId: patientId,
                  },

                  include: [
                    {
                      model: db.Allcode,
                      as: 'timeTypeDataPatient',
                      attributes: ['valueEn', 'valueVi'],
                    },
                    {
                      model: db.User,
                      as: 'doctorBookingData',
                      attributes: { exclude: ['image'] },
                    },
                  ],
                  
                  // raw = false mới dùng được hàm update
                  // raw = true trả về object của JS

                  raw: false
              })
             
              resolve(appointment)
              
          }
      } catch (error) {
          reject(error)
      }
  })
}

let updateInforPatientService = (data) => {
  return new Promise(async (resolve,reject) => 
  {
      try {
          if (!data.id || !data.address || !data.gender || !data.firstName || !data.phonenumber)
          {
              resolve({
                  errCode: 1,
                  errMessage: 'Missing parameter'
              })
          }
          else
          {
              let user = await db.User.findOne({
                  where: {
                    id: data.id,
                  },
                  // raw = false mới dùng được hàm update
                  // raw = true trả về object của JS
                  raw: false
              })
             
              if (user) {
                user.address = data.address
                user.gender = data.gender
                user.firstName = data.firstName
                user.phonenumber = data.phonenumber

                await user.save()

                resolve(user)
              }
              else
              {
                resolve({})
              }
              
          }
      } catch (error) {
          reject(error)
      }
  })
}
module.exports = {
    bookAppointmentService:bookAppointmentService,
    verifyBookAppointmentService:verifyBookAppointmentService,
    ForgotPasswordPatientService:ForgotPasswordPatientService,
    ConfirmPasswordService:ConfirmPasswordService,
    getBookingByIdService:getBookingByIdService,
    updateInforPatientService:updateInforPatientService
}