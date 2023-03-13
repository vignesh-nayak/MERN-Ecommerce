
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_CLEAR,
    CART_ERROR
} from '../constants/constantCart';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const itemExist = (state.cartItems).find(item => item.id === action.payload.id);
            if (itemExist) {
                return {
                    ...state,
                    cartItems: [...state.cartItems.map(item => {
                        if (item.id === itemExist.id) return action.payload
                        return item;
                    })]
                }
            }
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };
        case CART_REMOVE_ITEM:
            return { cartItems: [...(state.cartItems).filter(item => item.id !== action.payload.id)] };
        case CART_CLEAR:
            return { cartItems: [] };
        case CART_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}