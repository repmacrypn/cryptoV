import { useContext } from 'react'
import { IsActiveContext } from 'src/contexts/Contexts'

export const useIsActiveContext = () => {
    const setIsActive = useContext(IsActiveContext)

    if (!setIsActive) {
        throw new Error('useIsActiveContext must be used within a Provider')
    }

    return setIsActive
}