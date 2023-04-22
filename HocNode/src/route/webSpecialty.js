var express = require('express');
import specialtyController from '../controllers/specialtyController';

let router = express.Router()
let initWebRoutesSpecialty = (app) => {

    router.post('/api/create-new-specialty', specialtyController.createNewSpecialty)

    router.get('/api/get-specialty', specialtyController.getAllSpecialty)

    router.get('/api/get-detail-specialty-for-id', specialtyController.getDetailSpecialty)

    router.post('api/update-specialty', specialtyController.updateSpecialty)

    return app.use("/", router)
}

module.exports = initWebRoutesSpecialty
