var express = require('express');
import doctorController from '../controllers/doctorController'

let router = express.Router()
let initWebRoutesDoctor = (app) => {
    router.get('/api/super-doctor-home', doctorController.getSuperDoctorHome)

    router.get('/api/get-all-doctor', doctorController.getFullDoctors)

    router.post('/api/save-inf-doctor', doctorController.postInfoDoctor)

    router.get('/api/get-detail-doctor-for-id', doctorController.getDetailDoctorForId)

    router.get('/api/get-detail-markdown-for-id', doctorController.getDetailMardownForId)

    router.post('/api/bulk-create-schedule', doctorController.saveBulkCreateSchedule)

    router.get('/api/get-time-doctor-of-date', doctorController.getTimeDoctorOfDate)

    router.get('/api/get-more-infor-doctor-by-id', doctorController.getMoreInforDoctorById)

    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)

    router.get('/api/get-patient-of-doctor', doctorController.getPatientOfDoctor)

    router.post('/api/send-remedy', doctorController.sendRemedy)


    return app.use("/", router)
}

module.exports = initWebRoutesDoctor
