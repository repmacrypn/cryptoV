import { CryptoCoin } from 'src/types/cryptocoin.interface'
import { Timestamp } from './timestamp.interface'

export interface AssetsResponse extends Timestamp {
    data: CryptoCoin[];
}