var express = require('express');
import guideController from '../controllers/guidebookController';

let router = express.Router()
let initWebRoutesGuide = (app) => {

    router.post('/api/create-new-guide', guideController.createNewGuidebook)

    router.post('/api/get-all-guidebook', guideController.handleGetAllGuidebook)

    router.put('/api/update-guidebook', guideController.handleUpdateGuidebook)

    router.post('/api/get-guidebook-by-type', guideController.handleGetGuidebookByType)

    return app.use("/", router)
}

module.exports = initWebRoutesGuide
