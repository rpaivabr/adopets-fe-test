import axios from 'axios'
import { getSession, setSession } from './storage'
import { apiKey, defaultUser } from './utils';

const api = axios.create({
    baseURL: 'https://test.adopets.app/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

// API private routes
const getPets = async (query: any): Promise<any> => {
    const petResponse = await api.post('/pet/search', query)
    return petResponse.data
}

// if user session token exists, set to all private requests
const token = getSession();
if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// interceptor for refresh token 
let hasRefreshedToken = false
api.interceptors.response.use(
    async response => {
        if (response.data.status === 200) { // user token works
            return response
        } else {
            // Pass all non 401s back to the caller.
            if (response.data.status !== 401 && hasRefreshedToken) { 
                return Promise.reject(new Error(response.data.message));
            }

            // 401 (Unauthorized), start refresh token
            delete api.defaults.headers.common['Authorization']

            // get new session token
            const requestResponse = await api.post('/auth/session-request', { system_api_key: apiKey })
            if (requestResponse.data.status !== 200 && hasRefreshedToken) {
                return Promise.reject(new Error(requestResponse.data.message));
            }
            const sessionToken = requestResponse.data.data.access_key

            // get new user token
            const registerResponse = await api.post('/auth/session-register', defaultUser, { headers: { Authorization: `Bearer ${sessionToken}` } })
            if (registerResponse.data.status !== 200 && hasRefreshedToken) {
                return Promise.reject(new Error(registerResponse.data.message));
            }
            const userToken = registerResponse.data.data.access_key

            // set new user token on storage and for future requests
            setSession(userToken)
            api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`

            // success on generate new token, flag to true and reload application
            if (!hasRefreshedToken) {
                hasRefreshedToken = true 
                window.location.reload()
            }
            // fails when cannot generate new token at this moment
            return Promise.reject(new Error('Failed to refresh user token, please try again later'))
        }
    },
    error => {
        // if API returns error (offline), because all responses return "fake success" on original status,
        // and return the true error status on data.status of response
        return Promise.reject(new Error("API Internal Error"))
    }
)

export default getPets