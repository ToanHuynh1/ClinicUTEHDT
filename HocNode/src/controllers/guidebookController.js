import guidebookService from '../services/guidebookService'


module.exports = {
    createNewGuidebook: async (req, res) => 
    {
        try {
            let infor = await guidebookService.createNewGuidebookService(req.body)
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

    handleGetAllGuidebook: async (req, res) => 
    {
        try {
            let infor = await guidebookService.handleGetAllGuidebookService(req.body)
            return res.status(200).json({
                errCode: 0,
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
    handleUpdateGuidebook: async(req, res) =>
    {
        try {
            let infor = await guidebookService.handleUpdateGuidebookService(req.body)
            return res.status(200).json({
                errCode: 0,
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

    handleGetGuidebookByType: async(req, res) =>
    {
        try {
            let infor = await guidebookService.handleGetGuidebookByTypeService(req.body)
            return res.status(200).json({
                errCode: 0,
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
}    
