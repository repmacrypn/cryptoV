import { PortfolioAsset } from 'src/types/PortfolioAsset.interface'

export const getPortfolioArray = (): PortfolioAsset[] => {
    const portfolioArray: PortfolioAsset[] = []

    const keys: string[] = Object.keys(localStorage)
    for (const key of keys) {
        if (key === 'balance') continue
        portfolioArray.push(JSON.parse(localStorage.getItem(key)!))
    }

    return portfolioArray
}