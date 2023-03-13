import axios from 'axios';
import {
    PRODUCTS_LOADING,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAILURE,
    PRODUCT_LOADING,
    PRODUCT_SUCCESS,
    PRODUCT_FAILURE,
} from "../constants/constantProduct";

export const getAllProducts = (searchString = '') => async (dispatch) => {
    dispatch({ type: PRODUCTS_LOADING });

    try {
        if (searchString === '') {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/all`);
            dispatch({ type: PRODUCTS_SUCCESS, payload: data.products });
        }
        else {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/search/${searchString}`);
            dispatch({ type: PRODUCTS_SUCCESS, payload: data.products });
        }
    } catch (error) {
        dispatch({ type: PRODUCTS_FAILURE, payload: error });
    }
}

export const getProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_LOADING });

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/${productId}`);
        dispatch({ type: PRODUCT_SUCCESS, payload: data.product });
    } catch (error) {
        dispatch({ type: PRODUCT_FAILURE, payload: error });
    }
}