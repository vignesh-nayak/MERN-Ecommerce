import axios from 'axios';
import {
    USER_LOGGEDIN_FAILURE,
    USER_LOGGEDIN_LOADING,
    USER_LOGGEDIN_SUCCESS,
    USER_LOGGEDOUT,
    USER_REGISTRATION_FAILURE,
    USER_REGISTRATION_LOADING,
    USER_REGISTRATION_SUCCESS,
} from "../constants/constantUser";

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGGEDIN_LOADING });

    try {
        const config = {
            header: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/login`, { email, password }, config);
        dispatch({ type: USER_LOGGEDIN_SUCCESS, payload: data.user });
        if (data.user !== undefined) localStorage.setItem('userInfo', JSON.stringify(data.user));
        else localStorage.setItem('userInfo', JSON.stringify(null));
    } catch (error) {
        dispatch({ type: USER_LOGGEDIN_FAILURE, payload: error });
    }
}

export const register = (userObj) => async (dispatch) => {
    dispatch({ type: USER_REGISTRATION_LOADING });

    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/create`, userObj);
        if (data.statusCode === 400) dispatch({ type: USER_REGISTRATION_FAILURE, payload: data });
        if (data.statusCode === 200) dispatch({ type: USER_REGISTRATION_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: USER_REGISTRATION_FAILURE, payload: error });
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: USER_LOGGEDOUT });
    localStorage.removeItem('userInfo');
}