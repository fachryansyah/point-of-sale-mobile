const initialState = {
    cartList: []
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CART_FULFILLED':
            return {
                ...state,
                cartList: action.payload
            }
        case 'PUSH_CART':
            return {
                ...state,
                cartList: [...state.cartList, action.payload]
            }
        case 'ADD_QTY_CART':
            if (state.cartList[action.payload.index].qty < action.payload.limitQty) {
                state.cartList[action.payload.index].qty += 1
                state.cartList[action.payload.index].price += action.payload.price
            }
            return {
                ...state,
                cartList: state.cartList
            }
        case 'REDUCE_QTY_CART':
                state.cartList[action.payload.index].qty -= 1
                state.cartList[action.payload.index].price -= action.payload.price
                
                if (state.cartList[action.payload.index].qty < 1) {
                    state.cartList[action.payload.index].qty = 1
                    state.cartList[action.payload.index].price = action.payload.price
                }

                return {
                    ...state,
                    cartList: state.cartList
                }
        case 'REMOVE_CART':

            state.cartList.splice(action.payload, 1)

            return {
                ...state,
                cartList: state.cartList
            }
        case 'CLEAN_CART':
            return {
                ...state,
                cartList: []
            }
    
        default:
            return state
    }
}

export default cart