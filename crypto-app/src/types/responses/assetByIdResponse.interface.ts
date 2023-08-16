import { CryptoCoin } from 'src/types/cryptocoin.interface'
import { Timestamp } from './timestamp.interface'

export interface AssetByIdResponse extends Timestamp {
    data: CryptoCoin;
}