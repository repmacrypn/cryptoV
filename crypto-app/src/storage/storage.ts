import { PortfolioAsset } from 'src/types/PortfolioAsset.interface'
import { CryptoCoin } from 'src/types/cryptocoin.interface'

const storage = {
    get: (key: string): string | null | PortfolioAsset => {
        const result = localStorage.getItem(key)
        if (!result) return null
        try {
            return JSON.parse(result)
        } catch {
            return result
        }
    },
    set: (key: string, value: string | number | CryptoCoin): void => {
        localStorage.setItem(
            key,
            typeof value === 'string' ? value : JSON.stringify(value),
        )
    },
    clear: (): void => {
        localStorage.clear()
    },
}
export default storage