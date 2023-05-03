import actionTypes from './actionTypes';
import {getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, 
    typeInput, getSuperDoctorHomeService, getAllDoctorService, saveDetailDoctorService, getAllSpecialty,
    getAllClinic
} from '../../services/userService'
import { toast } from 'react-toastify';
// start doing end
// export const getGenderStart = () => ({
//     type: actionTypes.GET_GENDER_START
// })

export const getGenderStart = () => {

    return async (dispatch, getState) => 
    {
        try {
            dispatch({type: actionTypes.GET_GENDER_START })
            let res = await getAllCodeService('GENDER')
            if (res && res.errCode === 0)
            {
                dispatch(getGenderSuccess(res.data))
            } 
            else
            {
                dispatch(getGenderFail()) 
            }
        } 
        catch (error) {
            dispatch(getGenderFail()) 
            console.log(error)
        }
    }
    
}

export const getGenderSuccess = (dataGender) => ({
    type: actionTypes.GET_GENDER_SUCCESS,
    data: dataGender
})

export const getGenderFail= () => ({
    type: actionTypes.GET_GENDER_FAIL
})


export const getPostitionSuccess = (dataPosition) => ({
    type: actionTypes.GET_POSITION_SUCCESS,
    data: dataPosition
})

export const getPositionFail= () => ({
    type: actionTypes.GET_POSITION_FAIL
})

export const getRoleSuccess = (dataRole) => ({
    type: actionTypes.GET_ROLE_SUCCESS,
    data: dataRole
})

export const getRoleFail= () => ({
    type: actionTypes.GET_ROLE_FAIL
})

export const getPositonStart = () => {

    return async (dispatch, getState) => 
    {
        try {
            dispatch({type: actionTypes.GET_GENDER_START })
            let res = await getAllCodeService('POSITION')
            if (res && res.errCode === 0)
            {
                dispatch(getPostitionSuccess(res.data))
            } 
            else
            {
                dispatch(getPositionFail()) 
            }
        } 
        catch (error) {
            dispatch(getPositionFail()) 
            console.log(error)
        }
    }
    
}


export const getRoleStart = () => {
    return async (dispatch, getState) => 
    {
        try {
            dispatch({type: actionTypes.GET_GENDER_START })
            let res = await getAllCodeService('ROLE')
            if (res && res.errCode === 0)
            {
                dispatch(getRoleSuccess(res.data))
            } 
            else
            {
                dispatch(getRoleFail()) 
            }
        } 
        catch (error) {
            dispatch(getRoleFail()) 
            console.log(error)
        }
    }
    
}

export const createNewUser = (data) =>{
    return async (dispatch, getState) => 
    {
        try {
            let res = await createNewUserService(data)
            if (res && res.errCode === 0)
            {
                toast.success("Create a new user success !!!")
                dispatch(saveUserSuccess())
                dispatch(getAllUserStart())
            }
            else
            {
                toast.error('Create a new user error !!!')
                dispatch(saveUserFail()) 
            }
        } 
        catch (error) {
            toast.error('Create a new user error !!!')
            dispatch(saveUserFail()) 
            console.log(error)
        }
    }
}

export const saveUserSuccess = () =>(
{
    type: actionTypes.SAVE_USER_SUCCESS
})


export const saveUserFail = ()=> (
{
    type: actionTypes.SAVE_USER_FAIL
})


export const getAllUserStart = () => {

    return async (dispatch, getState) => 
    {
        
        try {
            let res = await getAllUsers('ALL')
            if (res && res.errCode === 0)
            {
                toast.success('Get all user success !!!')
                dispatch(getAllUserSuccess(res.users.reverse()))
            } 
            else
            {
                toast.error('Get all user error !!!')
                dispatch(getAllUserFail()) 
            }
        } 
        catch (error) {
            toast.error('Get all user error !!!')
            dispatch(getAllUserFail()) 
            console.log(error)
        }
    }
    
}

export const getAllUserSuccess = (data) =>(
    {
        type: actionTypes.GET_ALL_USERS_SUCCESS,
        users: data
    })
    
    
export const getAllUserFail = ()=> (
{
        type: actionTypes.GET_ALL_USERS_FAIL
})

export const deleteUser = (dataId) =>{
   
    return async (dispatch, getState) => 
        {
        try {
                let res = await deleteUserService(dataId)
            if (res && res.errCode === 0)
                {
                    toast.success("Delete user success !!!")
                    dispatch(deleteSuccess())
                    dispatch(getAllUserStart())
                }
            else
                {
                    toast.error('Delete user error !!!')
                    dispatch(deleteFail()) 
                }
        } 
        catch (error) {
                toast.error('Delete user error !!!')
                dispatch(deleteFail()) 
                console.log(error)
        }
    }
}

export const deleteSuccess = (data) =>(
{
        type: actionTypes.DELETE_USER_SUCCESS,
})
    
    
export const deleteFail = ()=> (
{
        type: actionTypes.DELETE_USER_FAIL
})

export const editUser = (data) =>{
   
    return async (dispatch, getState) => 
        {
        try {
                let res = await editUserService(data)
            if (res && res.errCode === 0)
                {
                    toast.success("Edit user success !!!")
                    dispatch(editSuccess())
                    dispatch(getAllUserStart())
                }
            else
                {
                    toast.error('Edit user error !!!')
                    dispatch(editFail()) 
                }
        } 
        catch (error) {
                toast.error('Edit user error !!!')
                dispatch(editFail()) 
                console.log(error)
        }
    }
}


export const editSuccess = (data) =>(
{
    type: actionTypes.EDIT_USER_SUCCESS,
})
        
        
export const editFail = ()=> (
{
    type: actionTypes.EDIT_USER_FAIL
})


export const getSuperDoc= () => {
    return async (dispatch, getState) => 
    {
        try {
            let res = await getSuperDoctorHomeService('10')
            if (res && res.errCode == 0)
            {
                dispatch({
                    type: actionTypes.GET_SUPER_DOCTOR_SUCCESS,
                    dataSuperDoc: res.data
                })
            }
            else{
                dispatch({
                    type: actionTypes.GET_SUPER_DOCTOR_FAIL,
                })
            }
        } 
        catch (error) { 
            console.log(error)
            dispatch({
                type: actionTypes.GET_SUPER_DOCTOR_FAIL,
            })
        }
}

}


export const getAllDoctors= () => {
    return async (dispatch, getState) => 
    {
        try {
            let res = await getAllDoctorService()
            if (res && res.errCode === 0)
            {
                dispatch({
                    type: actionTypes.GET_FULL_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            }

            else
            {
                dispatch({
                    type: actionTypes.GET_FULL_DOCTOR_FAIL
                })
                
            }
          
        } 
        catch (error) { 
            console.log(error)
            dispatch({
                type: actionTypes.GET_FULL_DOCTOR_FAIL
            })
        }
}

}


export const saveDetailDoctor= (data) => {
    return async (dispatch, getState) => 
    {
        try {
            let res = await saveDetailDoctorService(data)
            if (res && res.errCode === 0)
            {
                toast.success("Save infor detail doctor success !!!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }
            else
            {
                toast.error("Save infor detail doctor fail !!!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
                })
            }
        } 
        catch (error) { 
            console.log(error)
            toast.error("Save infor detail doctor fail !!!")
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
            })
        }
}

}


export const getAllScheduleTimes= () => {
    return async (dispatch, getState) => 
    {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0)
            {
                dispatch({
                    type: actionTypes.GET_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTimes: res.data
                })
            }

            else
            {
                dispatch({
                    type: actionTypes.GET_ALLCODE_SCHEDULE_TIME_FAIL
                })
                
            }
          
        } 
        catch (error) { 
            console.log(error)
            dispatch({
                type: actionTypes.GET_ALLCODE_SCHEDULE_TIME_FAIL
            })
        }
}

}

export const fetchRequiredDoctorInfo= () => {
    return async (dispatch, getState) => 
    {
        try {

            dispatch({type: actionTypes.GET_REQUIRED_DOCTOR_DOCTOR_INFO_START})

            let resPrice = await getAllCodeService("PRICE")
            let resPayment = await getAllCodeService("PAYMENT")
            let resProvince = await getAllCodeService("PROVINCE")
            let resSpecialty = await getAllSpecialty()
            let resClinic = await getAllClinic()
            

            if (resPrice && resPayment && resProvince && resPayment.errCode === 0
                 && resPrice.errCode== 0 && resProvince.errCode == 0&&
                 resSpecialty && resSpecialty.infor.errCode === 0 && resClinic && resClinic.infor.errCode === 0 
                )

                {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.infor.data,
                    resClinic : resClinic.infor.data
                }
                dispatch(getRequiredDoctorInfoSuccess(data))
            }

            else
            {
                dispatch(getRequiredDoctorInfoFail())
                
            }
          
        } 
        catch (error) { 
            console.log(error)
            dispatch(getRequiredDoctorInfoFail())
        }
}

}


export const getRequiredDoctorInfoSuccess= (allDataRequired) => ({
    type: actionTypes.GET_REQUIRED_DOCTOR_DOCTOR_INFO_SUCCESS,
    data:allDataRequired
    
})
export const getRequiredDoctorInfoFail= () => ({
    type: actionTypes.GET_REQUIRED_DOCTOR_DOCTOR_INFO_FAIL
    
})
