const initialState = {
    isAuthenticate: false,
    user: {
        firstname: '',
        lastname: '',
        email: ''
    }
}

const auth = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_USER':
            return {
                ...state,
                user: state.user
            }
        case 'AUTHENTICATED':
            return {
                ...state,
                isAuthenticate: true,
                user: action.payload
            }
        default: 
            return state
    }
}

export default auth