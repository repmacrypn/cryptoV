import { CryptoCoin } from './cryptocoin.interface'

export interface PortfolioAsset extends CryptoCoin {
    count: number;
}