import axios from "axios";


const getAuth_API_URL = 'http://127.0.0.1:8000/api/checkuser'
const getOut_API_URL = 'http://127.0.0.1:8000/api/signout'
const logIn_API_URL = 'http://127.0.0.1:8000/api/login'

export const getAuth = axios({
    url: getAuth_API_URL,
    method: 'GET',
})

export const getOut = axios({
    url: `${getOut_API_URL}`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})