const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    
    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // admin
    GET_GENDER_START: 'GET_GENDER_START',
    GET_GENDER_SUCCESS: 'GET_GENDER_SUCCESS',
    GET_GENDER_FAIL: 'GET_GENDER_FAIL',

    GET_POSITION_SUCCESS: 'GET_POSITION_SUCCESS',
    GET_POSITION_FAIL: 'GET_POSITION_FAIL',


    GET_ROLE_SUCCESS: 'GET_ROLE_SUCCESS',
    GET_ROLE_FAIL: 'GET_ROLE_FAIL',


    SAVE_USER_SUCCESS: 'SAVE_USER_SUCCESS',
    SAVE_USER_FAIL: 'SAVE_USER_FAIL',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAIL: 'DELETE_USER_FAIL',

    GET_ALL_USERS_SUCCESS: 'GET_ALL_USERS_SUCCESS',
    GET_ALL_USERS_FAIL: 'GET_ALL_USERS_FAIL',


    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAIL: 'EDIT_USER_FAIL',


    GET_SUPER_DOCTOR_SUCCESS: 'GET_SUPER_DOCTOR_SUCCESS',
    GET_SUPER_DOCTOR_FAIL: 'GET_SUPER_DOCTOR_FAIL',

    GET_FULL_DOCTOR_SUCCESS: 'GET_FULL_DOCTOR_SUCCESS',
    GET_FULL_DOCTOR_FAIL: 'GET_FULL_DOCTOR_FAIL',


    SAVE_DETAIL_DOCTOR_SUCCESS: 'SAVE_DETAIL_DOCTOR_SUCCESS',
    SAVE_DETAIL_DOCTOR_FAIL: 'SAVE_DETAIL_DOCTOR_FAIL',


    GET_ALLCODE_SCHEDULE_TIME_SUCCESS: 'GET_ALLCODE_SCHEDULE_TIME_SUCCESS',
    GET_ALLCODE_SCHEDULE_TIME_FAIL: 'GET_ALLCODE_SCHEDULE_TIME_FAIL',

    GET_REQUIRED_DOCTOR_DOCTOR_INFO_START: 'GET_REQUIRED_DOCTOR_DOCTOR_INFO_START',
    GET_REQUIRED_DOCTOR_DOCTOR_INFO_SUCCESS:'GET_REQUIRED_DOCTOR_DOCTOR_INFO_SUCCESS',
    GET_REQUIRED_DOCTOR_DOCTOR_INFO_FAIL: 'GET_REQUIRED_DOCTOR_DOCTOR_INFO_FAIL',


    UPDATE_CHECK_OPEN_UPDATE_INFOR: 'UPDATE_CHECK_OPEN_UPDATE_INFOR'

})
export default actionTypes;

