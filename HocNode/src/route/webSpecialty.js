var express = require('express');
import specialtyController from '../controllers/specialtyController';

let router = express.Router()
let initWebRoutesSpecialty = (app) => {

    router.post('/api/create-new-specialty', specialtyController.createNewSpecialty)

    router.get('/api/get-specialty', specialtyController.getAllSpecialty)

    router.get('/api/super-specialty-home', specialtyController.getSuperSpecialtyHome)

    router.get('/api/get-detail-specialty-for-id', specialtyController.getDetailSpecialty)

    router.put('/api/update-specialty', specialtyController.updateSpecialty)

    router.delete('/api/delete-specialty' , specialtyController.handleDeleteSpecialty)

    router.post('/api/review-specialty' , specialtyController.handleReviewSpecialty)

    return app.use("/", router)
}

module.exports = initWebRoutesSpecialty
