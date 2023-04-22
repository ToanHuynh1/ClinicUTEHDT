var express = require('express');
import clinicController from '../controllers/clinicController'

let router = express.Router()
let initWebRoutesClinic = (app) => {
   
    router.post('/api/create-new-clinic', clinicController.createNewClinic)

    router.get('/api/get-clinic', clinicController.getAllClinic)

    router.get('/api/get-detail-clinic-for-id', clinicController.getDetailClinic)

    return app.use("/", router)
}

module.exports = initWebRoutesClinic
