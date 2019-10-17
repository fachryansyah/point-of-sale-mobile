import AsyncStorage from '@react-native-community/async-storage'

export const fetchCart = () => {
    return {
        type: 'GET_CART',
        payload: new Promise((resolve, reject) => {

            AsyncStorage.getItem('@carts', (err, result) => {

                if (result) {
                    let cartsFromLocal = JSON.parse(result)

                    if (cartsFromLocal) {
                        resolve(cartsFromLocal)
                    }
                }

                if (err) {
                    reject(err)
                }
                
            })

        })
    }
}

export const pushCart = (product) => {
    console.log(product)
    return {
        type: 'PUSH_CART',
        payload: product
    }
}

export const addQtyCart = (index, price, limitQty) => {
    return {
        type: 'ADD_QTY_CART',
        payload: {
            index,
            price,
            limitQty
        }
    }
}

export const reduceQtyCart = (index, price) => {
    return {
        type: 'REDUCE_QTY_CART',
        payload: {
            index,
            price
        }
    }
}

export const removeCart = (index) => {
    return {
        type: 'REMOVE_CART',
        payload: index
    }
}

export const cleanCart = () =>{
    return {
        type: 'CLEAN_CART'
    }
}