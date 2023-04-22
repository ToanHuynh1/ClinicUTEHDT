import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {

}

const initialState = {
    genderLoading: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctor: [],
    allDoctors: [],
    allDataTime: [],
    allRequired: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GENDER_START: 
        let stateCoppy = {...state}
        stateCoppy.genderLoading = true
            return {
                ...stateCoppy,         
            }
        case actionTypes.GET_GENDER_SUCCESS: 
        state.genders = action.data
        state.genderLoading = false
            return {
                ...state,
            }
        case actionTypes.GET_GENDER_FAIL: 
        state.genders = []
        state.genderLoading = false
            return {
                ...state,
            }
        case actionTypes.GET_POSITION_SUCCESS: 
        state.positions = action.data
            return {
                ...state,         
            }
        case actionTypes.GET_POSITION_FAIL: 
        state.positions = []
            return {
                ...state,
            }
        case actionTypes.GET_ROLE_SUCCESS: 
        state.roles = action.data
            return {
                ...state,         
            }
        case actionTypes.GET_ROLE_FAIL: 
        state.roles = []
            return {
                ...state,
            }

        case actionTypes.GET_ALL_USERS_SUCCESS: 
            state.users = action.users
                return {
                    ...state,         
                }
        case actionTypes.GET_ALL_USERS_FAIL: 
            state.users = []
                return {
                    ...state,         
        }
        case actionTypes.GET_SUPER_DOCTOR_SUCCESS: 
                state.topDoctor = action.dataSuperDoc
                    return {
                        ...state,         
        }
        case actionTypes.GET_SUPER_DOCTOR_FAIL: 
        state.topDoctor = []
            return {
                ...state,         
        }

        case actionTypes.GET_FULL_DOCTOR_SUCCESS: 
        //      dataDoctors là tên trả về bên hàm ở trong adminActions
                state.allDoctors = action.dataDoctors
                    return {
                        ...state,         
        }
        case actionTypes.GET_FULL_DOCTOR_FAIL: 
        state.allDoctors = []
            return {
                ...state,         
        }
        case actionTypes.GET_ALLCODE_SCHEDULE_TIME_SUCCESS: 
            state.allDataTime = action.dataTimes
                return {
                    ...state,         
        }
        case actionTypes.GET_ALLCODE_SCHEDULE_TIME_FAIL: 
        state.allDataTime = []
            return {
                ...state,         
        }

        case actionTypes.GET_REQUIRED_DOCTOR_DOCTOR_INFO_SUCCESS: 
        state.allRequired = action.data

            return {
                ...state,         
        }
        case actionTypes.GET_REQUIRED_DOCTOR_DOCTOR_INFO_FAIL: 
        state.allRequired = []
            return {
                ...state,         
        }
            
        default:
            return state;
    }
}

export default adminReducer;