import { CryptoCoin } from 'src/types/cryptocoin.interface'

export interface AssetsResponse {
    data: CryptoCoin[];
    timestamp: number;
}