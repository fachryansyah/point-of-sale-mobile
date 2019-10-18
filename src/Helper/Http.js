import React from 'react'
import {useSelector} from 'react-redux'
import Axios from 'axios'
import {API_BASE_URL} from 'react-native-dotenv'
import AsyncStorage from '@react-native-community/async-storage'

// async function getToken() {
//     const token = await AsyncStorage.getItem("@token")
//     return token
// }

const instance = Axios.create({
    baseURL: `${API_BASE_URL}/api/v1`
})


async function getToken(){

    const token = await AsyncStorage.getItem("@token")

    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    
}

getToken()

export default instance