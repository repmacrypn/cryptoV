import { useContext } from 'react'
import { PortfolioAssetsContext } from 'src/contexts/Contexts'

export const usePortfolioAssetsContext = () => {
    const setIsActive = useContext(PortfolioAssetsContext)

    if (!setIsActive) {
        throw new Error('usePortfolioAssetsContext must be used within a Provider')
    }

    return setIsActive
}