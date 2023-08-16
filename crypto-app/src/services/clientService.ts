import axios from 'axios'
import { AssetByIdResponse } from 'src/types/responses/assetByIdResponse.interface'
import { AssetHistoryResponse } from 'src/types/responses/assetHistory.interface'
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
    async fetchAssetById(id: string) {
        const response = await instance.get<AssetByIdResponse>(`assets/${id}`)
        return response.data.data
    },
    async fetchAssetHistory(id: string, historyInterval: string) {
        const response = await instance.get<AssetHistoryResponse>(`assets/${id}/history?interval=${historyInterval}`)
        return response.data.data
    },
}