import { PortfolioAsset } from 'src/types/PortfolioAsset.interface'

const storage = {
    get: (key: string): null | PortfolioAsset => {
        const result = localStorage.getItem(key)

        if (!result) return null
        return JSON.parse(result)
    },
    set: (key: string, value: string | PortfolioAsset): void => {
        localStorage.setItem(
            key,
            typeof value === 'string' ? value : JSON.stringify(value),
        )
    },
    clear: (): void => {
        localStorage.clear()
    },
    removeItem: (key: string): void => {
        localStorage.removeItem(key)
    },
}
export default storage