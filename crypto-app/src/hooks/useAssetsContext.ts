import { useContext } from 'react'
import { AssetsContext } from 'src/contexts/Contexts'

export const useAssetsContext = () => {
    const assets = useContext(AssetsContext)
    if (!assets) {
        throw new Error('useAssetsContext must be used within a Provider')
    }

    return assets
}