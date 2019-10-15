
export const authenticate = (user) => {
    return {
        type: 'AUTHENTICATED',
        payload: user
    }
}

export const getUser = () => {
    return {
        type: 'GET_USER',
        payload: {}
    }
}