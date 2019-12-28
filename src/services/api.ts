import axios from 'axios'
import { getSession, setSession } from './storage'

const api = axios.create({
    baseURL: 'https://test.adopets.app/v1',
    headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
    }
})

const getPets = async (query: any): Promise<any> => {
    const token = await getUserToken()

    const petResponse = await api.post('/pet/search', query, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return petResponse.data
}

const getUserToken = async (): Promise<string> => {
    const refresh = getSession()
    
    if (refresh) {
        console.log('token vindo do storage')
        return refresh
    } else {
        const requestResponse = await api.post('/auth/session-request', {
            system_api_key: "505763d6-4202-4b05-9efc-93b366939bcf"
        })
        const sessionToken = requestResponse.data.data.access_key
        const registerResponse = await api.post('/auth/session-register', {
            "organization_user": {
                "email": "usuario-test@adopets.com",
                "password": "123123"
            }
        }, {
            headers: {
                Authorization: 'Bearer ' + sessionToken
            }
        })
        const userToken = registerResponse.data.data.access_key
        setSession(userToken)
        console.log('token gerado na hora')
        return userToken
    }
}

export default getPets