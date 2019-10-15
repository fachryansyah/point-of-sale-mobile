import { combineReducers } from 'redux'
import auth from './Auth'

const rootReducer = combineReducers({
    Auth: auth
})

export default rootReducer