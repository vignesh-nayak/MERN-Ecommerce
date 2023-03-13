import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';

import { productReducer, productsReducer } from "./reducers/reducerProduct";
import { userLoginReducer, userRegisterReducer } from "./reducers/reducerUser";
import { cartReducer } from "./reducers/reducerCart";
import { getOrdersReducer, orderCreateReducer } from "./reducers/reducerOrder";

const initialState = {
    userInfo: {
        userInfo: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,
    },
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : []
    },
};

const reducer = combineReducers({
    productList: productsReducer,
    productDetails: productReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    showOrders: getOrdersReducer,
});

export const store = configureStore({
    reducer,
    preloadedState: initialState
});