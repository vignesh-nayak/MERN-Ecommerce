import axios from 'axios';
import {
    ORDER_CREATE_FAILURE,
    ORDER_CREATE_LOADING,
    ORDER_CREATE_SUCCESS,
    USER_ORDERS_FAILURE,
    USER_ORDERS_LOADING,
    USER_ORDERS_SUCCESS
} from '../constants/constantOrder';

export const createOrder = (orderInfo) => async (dispatch) => {
    dispatch({ type: ORDER_CREATE_LOADING });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
        headers: {
            authorization: `Bearer ${userInfo?.token}`
        }
    }

    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/order/create`, { orderInfo }, config);
        if (data.order) dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        else dispatch({ type: ORDER_CREATE_FAILURE, payload: data });

    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAILURE, payload: error });
    }
}

export const getOrdersOfUser = () => async (dispatch) => {
    dispatch({ type: USER_ORDERS_LOADING });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
        headers: {
            authorization: `Bearer ${userInfo?.token}`
        }
    }
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/order/userOrders/${userInfo?.id}`, config);
        if (data.orders) dispatch({ type: USER_ORDERS_SUCCESS, payload: data.orders });
        else dispatch({ type: USER_ORDERS_FAILURE, payload: data });
    } catch (error) {
        dispatch({ type: USER_ORDERS_FAILURE, payload: error });
    }
}