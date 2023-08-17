import React from 'react'
import { PortfolioAsset } from 'src/types/PortfolioAsset.interface'

export const PageContext = React.createContext<number>(0)
export const IsActiveContext = React.createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(null)

interface IPortfolioAssetsContext {
    portfolioAssets: PortfolioAsset[];
    setPortfolioAssets: React.Dispatch<React.SetStateAction<PortfolioAsset[]>>;
}

export const PortfolioAssetsContext = React.createContext<IPortfolioAssetsContext | null>(null)