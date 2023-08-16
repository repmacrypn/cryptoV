import axios from 'axios'
import { AssetsResponse } from 'src/types/responses/assetsResponse'

export const API_URL = 'https://api.coincap.io/v2/'

const instance = axios.create({
    baseURL: API_URL,
})

interface AssetsParams {
    offset: number;
    limit?: number | '';
    ids?: string;
}

export const cryptoAPI = {
    async fetchAssets({ offset, limit = '', ids = '' }: AssetsParams) {
        const response = await instance.get<AssetsResponse>(`assets?offset=${offset * 10}&limit=${limit}&ids=${ids}`)
        return response.data.data
    },
}