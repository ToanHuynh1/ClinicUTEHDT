import patientService from '../services/patientService'

let bookAppointment = async (req,res) => {
    try {
        let info = await patientService.bookAppointmentService(req.body)
        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let verifyBookAppointment = async (req,res) => {
    try {
        let info = await patientService.verifyBookAppointmentService(req.body)

        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}


let ForgotPasswordPatient = async (req,res) => {
    try {
        let info = await patientService.ForgotPasswordPatientService(req.body)

        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let ConfirmPassword = async (req,res) => {
    try {
        let info = await patientService.ConfirmPasswordService(req.body)
        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getBookingById = async (req,res) => {
    try {
        let info = await patientService.getBookingByIdService(req.body.patientId)
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Get booking success',
            info
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let updateInforPatient = async (req,res) => {
    try {
        let info = await patientService.updateInforPatientService(req.body)
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Update infor success',
            info
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let sendReviewOfDetailDoctor = async (req,res) => {
    try {
        let info = await patientService.sendReviewOfDetailDoctorService(req.body)
        return res.status(200).json({
            info
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllReviewOfPatient =  async (req,res) => {
    try {
        let reponse = await patientService.getAllReviewOfPatientService(req.body)
        return res.status(200).json(reponse)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let updateRatingDoctor =  async (req,res) => {
    try {
        let reponse = await patientService.updateRatingDoctorService(req.body.id)
        return res.status(200).json(reponse)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    bookAppointment: bookAppointment,
    verifyBookAppointment: verifyBookAppointment,
    ForgotPasswordPatient:ForgotPasswordPatient,
    ConfirmPassword: ConfirmPassword,
    getBookingById:getBookingById,
    updateInforPatient:updateInforPatient,
    sendReviewOfDetailDoctor:sendReviewOfDetailDoctor,
    getAllReviewOfPatient:getAllReviewOfPatient,
    updateRatingDoctor:updateRatingDoctor
}