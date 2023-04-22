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



module.exports = {
    bookAppointment: bookAppointment,
    verifyBookAppointment: verifyBookAppointment,
    ForgotPasswordPatient:ForgotPasswordPatient,
    ConfirmPassword: ConfirmPassword
}