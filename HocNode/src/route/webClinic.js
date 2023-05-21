var express = require('express');
import clinicController from '../controllers/clinicController'

let router = express.Router()
let initWebRoutesClinic = (app) => {
   
    router.post('/api/create-new-clinic', clinicController.createNewClinic)

    router.get('/api/get-clinic', clinicController.getAllClinic)

    router.get('/api/super-clinic-home', clinicController.getSuperClinicHome)

    router.get('/api/get-detail-clinic-for-id', clinicController.getDetailClinic)

    router.delete('/api/delete-clinic' , clinicController.handleDeleteClinic)

    router.post('/api/review-clinic' , clinicController.handleReviewClinic)

    return app.use("/", router)
}

module.exports = initWebRoutesClinic
