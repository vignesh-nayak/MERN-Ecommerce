import {
    PRODUCTS_LOADING,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAILURE,
    PRODUCT_LOADING,
    PRODUCT_SUCCESS,
    PRODUCT_FAILURE,
} from "../constants/constantProduct";

export const productsReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCTS_LOADING:
            return { loading: true };
        case PRODUCTS_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCTS_FAILURE:
            return { loading: false, error: action.error };
        default:
            return state;
    }
}

export const productReducer = (state = { loading: true, product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_LOADING:
            return { loading: true };
        case PRODUCT_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_FAILURE:
            return { loading: false, error: action.error };
        default:
            return state;
    }
}