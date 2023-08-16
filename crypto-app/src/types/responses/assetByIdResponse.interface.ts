import { CryptoCoin } from 'src/types/cryptocoin.interface'

export interface AssetByIdResponse {
    data: CryptoCoin;
    timestamp: number;
}