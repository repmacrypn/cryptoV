import axios from 'axios'
/* import { CryptoCoin } from 'src/types/cryptocoin.interface' */

export const API_URL = 'api.coincap.io/v2/'

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
    },
})

export const cryptoAPI = {
    async fetchAssets() {
        const response = await instance.get('assets')
        return response.data
    },
}