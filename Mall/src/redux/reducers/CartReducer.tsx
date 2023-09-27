interface ICart {
    cartID: number,
    accountID: number,
    productID: number,
    productQuantity: number,
    timeAt: any,
    productTitle: string,
    productRate: number,
    productImageUrlStart: string,
    productImageUrlEnd: string,
    productCategory: string,
    productOldPrice: number,
    productActualPrice: number,
    sellerID: number,
}

const CartReducer = (
    state: { carts: ICart[], allItem: number } = {
        carts: [],
        allItem: 0
    },
    action: { carts: ICart[]; cart: ICart, id: number, type: string },
) => {
    switch (action.type) {
        case 'GET_CART_SUCCESS': {
            return { ...state, carts: action.carts || [] };
        }

        case 'ADD_TO_CART': {
            console.log('okok');
            let newListCarts = state.carts;
            if (action.cart) {
                newListCarts = [...newListCarts, action.cart];
            }
            // console.log('>>', newListCarts);

            return {
                ...state,
                carts: newListCarts,
            };
        }

        case 'INCREMENT_QUANTITY': {
            let listCarts = state.carts;
            let newListCarts;
            newListCarts = listCarts.map((item: ICart) => {
                if (item.cartID == action.cart.cartID) {
                    return {
                        ...item,
                        productQuantity: action.cart.productQuantity + 1,
                    }
                }
                return item
            })
            // console.log(newListCarts);
            return {
                ...state,
                carts: newListCarts
            }
        }
        case 'DECREMENT_QUANTITY': {
            let listCarts = state.carts;
            let newListCarts;
            newListCarts = listCarts.map((item: ICart) => {
                if (item.cartID == action.cart.cartID) {
                    return {
                        ...item,
                        productQuantity: action.cart.productQuantity - 1,
                    }
                }
                return item
            })
            // console.log(newListCarts);
            return {
                ...state,
                carts: newListCarts
            }
        }
        case 'REMOVE_FROM_CART': {
            // console.log('okok');
            let listCarts = state.carts;
            let newListCarts;
            if (action.id) {
                newListCarts = listCarts.filter(
                    (item: ICart) => item.cartID !== Number(action.id),
                );
            }
            return {
                ...state,
                carts: newListCarts,
            };
        }
        default:
            return state;
    }
};


export { CartReducer }