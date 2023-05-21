import clinicService from '../services/clinicService'

module.exports = {
    createNewClinic : async (req, res) => 
    {
        try {
            let infor = await clinicService.createNewClinicService(req.body)
            return res.status(200).json({
                infor
            })
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
    
    getAllClinic  : async (req, res) => 
    {
        try {
            let infor = await clinicService.getAllClinicService(req.body)
            return res.status(200).json({
                infor
            })
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
    
    getDetailClinic : async (req, res) => 
    {
        try {
            let infor = await clinicService.getDetailClinicService(req.query.id)
            return res.status(200).json({
                infor
            })
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },

    handleDeleteClinic: async (req,res) => {
        try {
            if (!req.body.id) {
                return res.status(300).json({
                    errCode: 1,
                    errMessage: "Thiếu tham số"
                })
            }
        
            let message = await clinicService.handleDeleteClinicService(req.body.id)
        
            return res.status(200).json(message)
        
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },

    handleReviewClinic: async (req,res) => 
    {
        try {
            let infor = await clinicService.handleReviewClinicService(req.body)
            return res.status(200).json({
                infor
            })
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                message: 'Error from server'
            })
        }
    },

    getSuperClinicHome: async (req,res) => 
    {
        let limit = req.query.limit
        if(!limit) limit = 10
        try {
            let infor = await clinicService.getSuperClinicHome(+limit)
            return res.status(200).json({
                infor
            })
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                message: 'Error from server'
            })
        }
    },
}
