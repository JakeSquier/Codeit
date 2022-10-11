import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000';

const API_URL = '/api/users/'

//the functions in this file are our helper functions for './authslice' 

//Register user
const register = async (userData) => {
    //sending http request below (post)
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        //if request is successful it is stored in local storage below
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login user
const login = async (userData) => {
    //sending http request below (post)
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        //if request is successful it is stored in local storage below
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService