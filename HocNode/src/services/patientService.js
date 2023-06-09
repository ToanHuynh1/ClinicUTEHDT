import db from "../models";
require('dotenv').config()
import _ from 'lodash'
import emailService from './emailService'
var bcrypt = require('bcryptjs');
import { v4 as uuidv4 } from 'uuid';
var salt = bcrypt.genSaltSync(10);
let buildUrlEmail = (doctorId, token, gmail) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}&gmail=${gmail}`
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
                    redirectLink: buildUrlEmail(data.doctorId, token, data.gmail),
                })

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                      email: data.email,
                      roleId: 'R3',
                      gender: data.selectedGender,
                      address: data.address,
                      firstName: data.fullName,
                      positionId: 'P5'
                    }
                  });

                  if (user && user[0] ){
                    await db.Booking.create({
                        statusId: 'S1',
                        doctorId: data.doctorId,
                        patientId: user[0].id,
                        date : data.date,
                        timeType: data.timeType, 
                        token: token
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
            if (!data.token || !data.doctorId || !data.gmail)
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

                    let dataUser = await db.User.findOne({
                      where: {
                        email: data.gmail,
                        password: null
                      },
                      raw: false
                    })

                    let randomNumber = Math.floor(Math.random() * 90000) + 10000;
                    let password = `hcmute${randomNumber.toString()}`;

                    if (dataUser){
                      await emailService.sendSimpleEmailPassowrd({
                        receiverEmail: data.gmail,
                        language: data.language,
                        password: password
                     })

                      let hashPasswordFromBcrypt = await hashUserPassword(password)

                      dataUser.password = hashPasswordFromBcrypt
  
                      await dataUser.save()   
               
                    }

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

let updateInforPatientService = async (data) => {
    const t = await db.sequelize.transaction();
    try {
      const user = await db.User.findOne({
        where: {
          id: data.id,
        },
        transaction: t,
      });

      if (!user) {
        throw new Error('Không tìm thấy người dùng');
      }

      user.address = data.address;
      user.gender = data.gender;
      user.firstName = data.firstName;
      user.phonenumber = data.phonenumber;

      await user.save({ transaction: t });

      const reviews = await db.Review.findAll({
        where: {
          patientId: data.id,
        },
        transaction: t,
      });

      if (reviews.length > 0) {
        await Promise.all(reviews.map(async (review) => {
          review.patientName = data.firstName;
          await review.save({ transaction: t });
        }));
      }

      await t.commit();
      return user;
    } 
    catch (error) {
      await t.rollback();
      throw error;
    }
};


let sendReviewOfDetailDoctorService = (data) => {
  return new Promise(async (resolve,reject) => 
  {
      try {

          if (!data.patientName || !data.doctorId || !data.date || !data.status || !data.patientId || !data.rating)
          {
              resolve({
                  errCode: 1,
                  errMessage: 'Missing parameter'
              })
          }
          else
          {
            await db.Review.create({
              doctorId: data.doctorId,
              patientName: data.patientName,
              patientId: data.patientId,
              date: data.date,
              status: data.status,
              rating: data.rating
            })
            resolve({
              errCode: 0,
              errMessage: 'Gửi đánh giá thành công'
            })
          }
      } catch (error) {
          reject(error)
      }
  })
}

let getAllReviewOfPatientService = (data) => {
  return new Promise(async (resolve,reject) => 
  {
      try {

          if (!data.doctorId){
            resolve({
              errCode: 1,
              errMessage: 'Thiếu tham số'
            })
          }
          else
          {
            let dataReview = await db.Review.findAll({
              where: {
                doctorId: data.doctorId
              }
            })

            await updateRatingDoctorService({
              id: data.doctorId
            })

            resolve({
              errCode: 0,
              errMessage: 'Lấy thông tin đánh giá thành công',
              dataReview
            })
          }
        
      } catch (error) {
          reject(error)
      }
  })
}


let updateRatingDoctorService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: 'Thiếu tham số'
        });
      } else {
        let dataReviewRating = await db.Review.findAll({
          where: {
            doctorId: id.id,
          },
          attributes: ['rating'],
          raw: true // Chỉ lấy trường "rating"
        });

        let totalRating = dataReviewRating.reduce((total, data) => total + data.rating, 0);

        let averageRating = totalRating / dataReviewRating.length;

        let roundedAverageRating = Math.ceil(averageRating);

        let dataDoctor = await db.User.findOne({
          where: {
            id: id.id
          },
          attributes: ['rating', 'id'],
          raw: false
        })

        if (dataDoctor) {
          dataDoctor.rating = roundedAverageRating
          await dataDoctor.save()
        }

        resolve({
          errCode: 0,
          errMessage: 'Lấy thông tin bình chọn thành công',
          dataReviewRating
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};


module.exports = {
    bookAppointmentService:bookAppointmentService,
    verifyBookAppointmentService:verifyBookAppointmentService,
    ForgotPasswordPatientService:ForgotPasswordPatientService,
    ConfirmPasswordService:ConfirmPasswordService,
    getBookingByIdService:getBookingByIdService,
    updateInforPatientService:updateInforPatientService,
    sendReviewOfDetailDoctorService:sendReviewOfDetailDoctorService,
    getAllReviewOfPatientService:getAllReviewOfPatientService,
    updateRatingDoctorService:updateRatingDoctorService
}