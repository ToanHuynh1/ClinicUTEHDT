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
            console.log(error)
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
    }

}    
