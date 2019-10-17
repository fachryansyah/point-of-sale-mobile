import { combineReducers } from 'redux'
import auth from './Auth'
import cart from './Cart'

const rootReducer = combineReducers({
    Auth: auth,
    Cart: cart
})

export default rootReducer