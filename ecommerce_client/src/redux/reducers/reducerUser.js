
import {
    USER_LOGGEDIN_FAILURE,
    USER_LOGGEDIN_LOADING,
    USER_LOGGEDIN_SUCCESS,
    USER_LOGGEDOUT,
    USER_REGISTRATION_FAILURE,
    USER_REGISTRATION_LOADING,
    USER_REGISTRATION_SUCCESS
} from "../constants/constantUser";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGGEDIN_LOADING:
            return { loading: true };
        case USER_LOGGEDIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGGEDIN_FAILURE:
            return { loading: false, error: action.payload };
        case USER_LOGGEDOUT:
            return {};
        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTRATION_LOADING:
            return { loading: true };
        case USER_REGISTRATION_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_REGISTRATION_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}