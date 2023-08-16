import { AssetHistory } from '../assetHistory.interface'
import { Timestamp } from './timestamp.interface'

export interface AssetHistoryResponse extends Timestamp {
    data: AssetHistory[];
}