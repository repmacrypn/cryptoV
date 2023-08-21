import React from 'react'
import { CryptoCoin } from 'src/types/cryptocoin.interface'

export const PageContext = React.createContext<number>(0)
export const IsActiveContext = React.createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(null)

interface IPortfolioAssetsContext {
    portfolioAssets: CryptoCoin[];
    setPortfolioAssets: React.Dispatch<React.SetStateAction<CryptoCoin[]>>;
    initialBalance: number;
    setInitialBalance: React.Dispatch<React.SetStateAction<number>>;
}

export const PortfolioAssetsContext = React.createContext<IPortfolioAssetsContext | null>(null)