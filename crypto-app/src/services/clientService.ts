import axios from 'axios'
import { AssetsResponse } from 'src/types/responses/assetsResponse'
import { LIMIT } from 'src/utils/paginationData'

export const API_URL = 'https://api.coincap.io/v2/'

const instance = axios.create({
    baseURL: API_URL,
})

export const cryptoAPI = {
    async fetchAssets(offset = 0) {
        const response = await instance.get<AssetsResponse>(`assets?offset=${offset * 10}&limit=${LIMIT}`)
        return response.data.data
    },
}