var express = require('express');
import patientController from '../controllers/patientController';

let router = express.Router()
let initWebRoutesPatient = (app) => {
  
    router.post('/api/patient-book-appointment', patientController.bookAppointment)

    router.post('/api/verify-book-appointment', patientController.verifyBookAppointment)

    router.post('/api/forgotpassword', patientController.ForgotPasswordPatient)

    router.post('/api/confirm-password', patientController.ConfirmPassword)

    return app.use("/", router)
}

module.exports = initWebRoutesPatient
