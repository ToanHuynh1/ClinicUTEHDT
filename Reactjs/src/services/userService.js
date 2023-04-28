import axios from "../axios"

export const handleLoginApi = (email,password) =>
{
    return axios.post('http://localhost:1906/api/login', 
    {
        email,
        password
    })
}

export const getAllUsers = (inputId) =>
{
    return axios.get(`http://localhost:1906/api/get-all-users?id=${inputId}`)
}

export const createNewUserService = (data) =>
{
    return axios.post('http://localhost:1906/api/create-new-user',data)
}

export const deleteUserService = (userid) =>
{
    return axios.delete('http://localhost:1906/api/delete-user', {
        data: {
            id: userid
        }
    })
}

export const editUserService = (userData) =>
{   
    return axios.put('http://localhost:1906/api/edit-user', userData)

}

export const getAllCodeService = (input) =>
{
    return axios.get(`http://localhost:1906/api/allcode?type=${input}`)
}

export const getAllDoctorService = () => 
{
    return axios.get(`http://localhost:1906/api/get-all-doctor`)
}

export const getSuperDoctorHomeService = (limitInput) =>
{
    return axios.get(`http://localhost:1906/api/super-doctor-home?limit=${limitInput}`)
}

export const saveDetailDoctorService = (dataInput) =>
{
    return axios.post('http://localhost:1906/api/save-inf-doctor',dataInput)
}

export const getDetailInfoDoctor = (id) => {
    return axios.get(`http://localhost:1906/api/get-detail-doctor-for-id?id=${id}`)
}

export const getDetailInfoMarkdown = (id) => {
    return axios.get(`http://localhost:1906/api/get-detail-markdown-for-id?id=${id}`)
}

export const saveInforBulkDoctor = (data) => {
    return axios.post(`http://localhost:1906/api/bulk-create-schedule`, data)
}

export const getTimeOfDoctorByDate = (doctorId, date) => {
    return axios.get(`http://localhost:1906/api/get-time-doctor-of-date?doctorId=${doctorId}&date=${date}`)
}

export const getMoreInfoDoctorById = (doctorId) => {
    return axios.get(`http://localhost:1906/api/get-more-infor-doctor-by-id?doctorId=${doctorId}`)
}


export const getProflieDoctorById = (doctorId) => {
    return axios.get(`http://localhost:1906/api/get-profile-doctor-by-id?inputId=${doctorId}`)
}


export const postPatientBookingAppointment = (data) => {
    return axios.post(`http://localhost:1906/api/patient-book-appointment`, data)
}


export const postVerifyAppointment= (data) => {
    return axios.post(`http://localhost:1906/api/verify-book-appointment`, data)
}


export const createNewSpecialty= (data) => {
    return axios.post(`http://localhost:1906/api/create-new-specialty`, data)
}


export const getAllSpecialty= () => {
    return axios.get(`http://localhost:1906/api/get-specialty`)
}

export const getDetailSpecialty= (data) => {
    return axios.get(`http://localhost:1906/api/get-detail-specialty-for-id?id=${data.id}&location=${data.location}`)
}

export const createNewClinic= (data) => {
    return axios.post(`http://localhost:1906/api/create-new-clinic`, data)
}

export const getAllClinic= () => {
    return axios.get(`http://localhost:1906/api/get-clinic`)
}

export const getAllClinicById= (data) => {
    return axios.get(`http://localhost:1906/api/get-detail-clinic-for-id?id=${data.id}`)
}

export const getPatientOfDoctor = (data) => {
    return axios.get(`http://localhost:1906/api/get-patient-of-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

export const postSendRemedy= (data) => {
    return axios.post(`http://localhost:1906/api/send-remedy`, data)
}


export const postSignup= (data) => {
    return axios.post(`http://localhost:1906/api/signup`, data)
}

export const forgotPassword= (data) => {
    return axios.post(`http://localhost:1906/api/forgotpassword`, data)
}


export const confirmPassword= (data) => {
    return axios.post(`http://localhost:1906/api/confirm-password`, data)
}

export const createNewGuidebook= (data) => {
    return axios.post(`http://localhost:1906/api/create-new-guide`, data)
}


export const getAllGuidebook= (data) => {
    return axios.post(`http://localhost:1906/api/get-all-guidebook`, data)
}


export const editGuidebookService = (guidebookData) =>
{   
    return axios.put('http://localhost:1906/api/update-guidebook', guidebookData)
}

export const getAllGuidebookByType= (data) => {
    return axios.post(`http://localhost:1906/api/get-guidebook-by-type`, data)
}


export const getAllBookingById= (data) => {
    return axios.post(`http://localhost:1906/api/get-booking-by-id`, data)
}

export const updateInforPatient= (data) => {
    return axios.post(`http://localhost:1906/api/update-infor-from-homepage`, data)
}


export const handleGetUserById= (data) => {
    return axios.post(`http://localhost:1906/api/get-user-by-id`, data)
}

export const editSpecialtyService = (specialtyData) =>
{   
    return axios.put('http://localhost:1906/api/update-specialty', specialtyData)
}


export const deleteGuidebookService = (guibookid) =>
{
    return axios.delete('http://localhost:1906/api/delete-guidebook-by-id',  
    {
        data: {
            id: guibookid
        }
    })
}