import specialtyService from '../services/specialtyService'


module.exports = {

    createNewSpecialty: async (req, res) => 
    {
        try {
            let infor = await specialtyService.createNewSpecialtyService(req.body)
            return res.status(200).json({
                infor
            })
        } catch (error) {
        
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },
    
    getAllSpecialty: async (req, res) => 
    {
        try {
            let infor = await specialtyService.getAllSpecialtyService()
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
    
    
    getDetailSpecialty :  async (req, res) => 
    {
        try {
            let infor = await specialtyService.getDetailSpecialtyService(req.query.id, req.query.location)
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
    updateSpecialty: async (req,res) => {
        try {
            let infor = await specialtyService.updateSpecialtyService(req.body)
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

    handleDeleteSpecialty: async (req,res) => {
        try {
            if (!req.body.id) {
                return res.status(300).json({
                    errCode: 1,
                    errMessage: "Thiếu tham số"
                })
            }
        
            let message = await specialtyService.handleDeleteSpecialtyService(req.body.id)
        
            return res.status(200).json(message)
        
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    },


    getSuperSpecialtyHome : async (req,res) => 
    {
        let limit = req.query.limit
        if(!limit) limit = 10
        try {
            let infor = await specialtyService.getSuperSpecialtyHome(+limit)
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

    handleReviewSpecialty: async (req,res) => 
    {
        try {
            let infor = await specialtyService.handleReviewSpecialtyService(req.body)
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
