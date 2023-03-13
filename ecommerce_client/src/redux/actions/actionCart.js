import axios from 'axios';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_CLEAR,
    CART_ERROR
} from '../constants/constantCart';

export const addItem = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/${id}`);
        if (data.product) {
            dispatch({
                type: CART_ADD_ITEM, payload: {
                    id: data.product._id,
                    name: data.product.name,
                    price: data.product.price,
                    qty,
                }
            });
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        }

    } catch (error) {
        dispatch({ type: CART_ERROR, payload: error });
    }
}

export const removeItem = (id) => async (dispatch, getState) => {
    const it = { id };
    dispatch({ type: CART_REMOVE_ITEM, payload: it });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

}

export const clearCart = () => async (dispatch) => {
    dispatch({ type: CART_CLEAR });
    localStorage.removeItem('cartItems');
}
