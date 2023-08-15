import axios from 'axios'
import { AssetsResponse } from 'src/types/responses/assetsResponse'

export const API_URL = 'https://api.coincap.io/v2/'
export const total = 100

const instance = axios.create({
    baseURL: API_URL,
})

export const cryptoAPI = {
    async fetchAssets(offset = 0) {
        const response = await instance.get<AssetsResponse>(`assets?offset=${offset}&limit=${total}`)
        return response.data.data
    },
}