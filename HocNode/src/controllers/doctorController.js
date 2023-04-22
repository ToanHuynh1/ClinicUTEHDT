import db from "../models";
import doctorService from '../services/doctorService'



module.exports = {
    getSuperDoctorHome : async (req,res) => 
    {
        let limit = req.query.limit
        if(!limit) limit = 10
        try {
            let response = await doctorService.getSuperDoctorHome(+limit)
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                message: 'Error from server'
            })
        }
    },
    
    
   getFullDoctors : async (req,res) => 
    {
        try {
            let doctors = await doctorService.getFullDoctors()
            return res.status(200).json(doctors)
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
    
   postInfoDoctor : async (req,res) => {
        try {
            // phương thức post
            let response = await doctorService.saveInfoDocService(req.body)
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
    
    getDetailDoctorForId : async (req,res) => {
        try {
            let info = await doctorService.getDetailDoctorForIdService(req.query.id)
            return res.status(200).json(info)
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
    
    getDetailMardownForId : async (req,res) => {
        try {
            let info = await doctorService.getDetailMardownForIdService(req.query.id)
            return res.status(200).json(info)
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
    
    saveBulkCreateSchedule : async (req,res) => {
        try {
            let info = await doctorService.bulkCreateScheduleService(req.body)
            return res.status(200).json(info)
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },

    getTimeDoctorOfDate : async (req,res) => {
        try {
            let info = await doctorService.getTimeDoctorOfDateService(req.query.doctorId, req.query.date)
            return res.status(200).json(info)
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
    
    getMoreInforDoctorById : async (req,res) => {
        try {
            let info = await doctorService.getMoreInforDoctorByIdService(req.query.doctorId)
            return res.status(200).json(info)
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
    
    getProfileDoctorById : async (req,res) => {
        try {
            let info = await doctorService.getProfileDoctorByIdService(req.query.inputId) 
            return res.status(200).json(info)
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
    getPatientOfDoctor: async (req,res) => {
        try {            
            let info = await doctorService.getPatientOfDoctorService(req.query.doctorId, req.query.date )
         
            return res.status(200).json(info)
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
    sendRemedy : async (req, res) => {
        try {
            let infor = await doctorService.sendRemedyService(req.body)

            return res.status(200).json({
                infor
            })
        } catch (error) {
            console.log(error)
        }
    }
}




