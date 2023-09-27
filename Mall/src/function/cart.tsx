import axios from "axios";
import { BASE_URL } from "../../config";

export const addToCart = async (accountID: any, productID: any) => {
    await axios.post(`${BASE_URL}/cart`, {
        accountID, productID
    })
        .then(function (response) {
            console.log('add');
        })
        .catch(function (error) {
            console.log(error);
        });
}
export const incrementQuantity = async (productID: number) => {
    await axios.put(`${BASE_URL}/cart/increment`, {
        productID
    })
        .then(function (response) {
            console.log('update increment');
        })
        .catch(function (error) {
            console.log(error);
        });
}
export const removeToCart = (cartID: any) => {
    axios.delete(`${BASE_URL}/cart/${cartID}`)
        .then(response => {
            console.log(`Deleted post with ID ${cartID}`);
        })
        .catch(error => {
            console.error(error);
        });
}
export const decrementQuantity = async (productID: number) => {
    await axios.put(`${BASE_URL}/cart/decrement`, {
        productID
    })
        .then(function (response) {
            console.log('update decrement');
        })
        .catch(function (error) {
            console.log(error);
        });
}