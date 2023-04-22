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
    }
}
