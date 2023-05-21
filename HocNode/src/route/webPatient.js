var express = require('express');
import patientController from '../controllers/patientController';

let router = express.Router()
let initWebRoutesPatient = (app) => {
  
    router.post('/api/patient-book-appointment', patientController.bookAppointment)

    router.post('/api/verify-book-appointment', patientController.verifyBookAppointment)

    router.post('/api/forgotpassword', patientController.ForgotPasswordPatient)

    router.post('/api/confirm-password', patientController.ConfirmPassword)

    router.post('/api/get-booking-by-id', patientController.getBookingById)

    router.post('/api/update-infor-from-homepage', patientController.updateInforPatient)

    router.post('/api/review-for-doctor', patientController.sendReviewOfDetailDoctor)

    router.post('/api/get-all-review', patientController.getAllReviewOfPatient)

    router.post('/api/update-rating-doctor', patientController.updateRatingDoctor)
    
    return app.use("/", router)
}

module.exports = initWebRoutesPatient
