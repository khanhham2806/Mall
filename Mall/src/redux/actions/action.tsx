import axios from 'axios';
import { AppDispatch } from '../store';
import { BASE_URL } from '../../../config';


const getListCart = (accountID: number) => async (dispatch: AppDispatch) => {

    try {
        const response = await axios.get(`${BASE_URL}/cart/${accountID}`)
        if (response.status) {
            dispatch({
                type: 'GET_CART_SUCCESS',
                carts: response.data.data || [],
            });
        }
    }
    catch (err) {
        console.log((err));
    }

};
const addToCart = (accountID: number, productID: number, item: any) => async (dispatch: AppDispatch) => {
    // console.log(item);
    const body: any = {
        accountID: accountID,
        productID: productID,
        productActualPrice: item.productActualPrice,
        productImageUrlStart: item.productImageUrlStart,
        productImageUrlEnd: item.productImageUrlEnd,
        productOldPrice: item.productOldPrice,
        productRate: item.productRate,
        productTitle: item.productTitle,
        sellerID: item.sellerID
    }
    const response = await axios.post(`${BASE_URL}/cart`, body)
    if (response.status) {
        // console.log('>>>>', response.data.data)
        dispatch({
            type: 'ADD_TO_CART',
            cart: response.data.data
        });
    }
}

const toggleCheckbox = () => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'TOGGLE_CHECKBOX',
    });
}
const incrementQuantity = (cartID: number, item: any) => async (dispatch: AppDispatch) => {
    // console.log(item);
    const response = await axios.put(`${BASE_URL}/cart/increment`, {
        cartID
    })
    if (response.status) {
        // console.log(item);
        dispatch({
            type: 'INCREMENT_QUANTITY',
            cart: item
        });
    }
}
const decrementQuantity = (cartID: number, item: any) => async (dispatch: AppDispatch) => {
    // console.log(item);
    if (item.productQuantity == 1) {
        const response = await axios.delete(`${BASE_URL}/cart/${cartID}`)
        if (response.status) {
            // console.log(item);
            dispatch({
                type: 'REMOVE_FROM_CART',
                id: cartID,
            });
        }
    }
    else {
        const response = await axios.put(`${BASE_URL}/cart/decrement`, {
            cartID
        })
        if (response.status) {
            // console.log(item);
            dispatch({
                type: 'DECREMENT_QUANTITY',
                cart: item
            });
        }
    }

}

const removeFromCart = (cartID: number) => async (dispatch: AppDispatch) => {
    const response = await axios.delete(`${BASE_URL}/cart/${cartID}`)
    if (response.status) {
        // console.log(response.data.data);
        dispatch({
            type: 'REMOVE_FROM_CART',
            id: cartID,
        });
    }
}

export { getListCart, addToCart, toggleCheckbox, incrementQuantity, decrementQuantity, removeFromCart };