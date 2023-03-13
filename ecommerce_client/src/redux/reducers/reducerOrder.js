import {
    ORDER_CREATE_FAILURE,
    ORDER_CREATE_LOADING,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    USER_ORDERS_FAILURE,
    USER_ORDERS_LOADING,
    USER_ORDERS_RESET,
    USER_ORDERS_SUCCESS
} from "../constants/constantOrder";


export const orderCreateReducer = (state = { loading: true, order: {} }, action) => {
    switch (action.type) {
        case ORDER_CREATE_LOADING:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_CREATE_FAILURE:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const getOrdersReducer = (state = { loading: true, order: {} }, action) => {
    switch (action.type) {
        case USER_ORDERS_LOADING:
            return { loading: true };
        case USER_ORDERS_SUCCESS:
            return { loading: false, orders: action.payload };
        case USER_ORDERS_FAILURE:
            return { loading: false, error: action.payload };
        case USER_ORDERS_RESET:
            return {};
        default:
            return state;
    }
}
