import { useState } from 'react'
import { usePortfolioAssetsContext } from 'src/hooks/usePortfolioAsssetsContext'
import { CryptoCoin } from 'src/types/cryptocoin.interface'
import storage from 'src/storage/storage'

export const SubmitField = ({ portfolioAsset }: { portfolioAsset: CryptoCoin }) => {
    const [inputValue, setInputValue] = useState('')
    const { portfolioAssets, initialBalance, setPortfolioAssets, setInitialBalance } = usePortfolioAssetsContext()

    const handleAddButtonClick = () => {
        const numInputValue: number = Number(inputValue)
        const totalBuyCount: number = numInputValue * Number(portfolioAsset.priceUsd)

        const id: string = portfolioAsset.id
        const count: number | undefined = storage.get(id)?.count

        if (isNaN(numInputValue) || numInputValue === 0) {
            alert('Input string must be a number and not 0!')
            return
        }

        if (totalBuyCount > initialBalance) {
            alert('Invalid operation! Replenish the balance!')
            return
        }

        if (count) {
            storage.set(id, { count: numInputValue + count, priceUsd: portfolioAsset.priceUsd })
            setInitialBalance(prev => prev - totalBuyCount /* - Number(count) * Number(portfolioAsset.priceUsd) */)
        } else {
            storage.set(id, { count: numInputValue, priceUsd: portfolioAsset.priceUsd })
            setInitialBalance(prev => prev - totalBuyCount)
            setPortfolioAssets([...portfolioAssets, portfolioAsset])
        }
    }

    return (
        <div>
            <div>
                {portfolioAsset.name}{': '}
                price: {portfolioAsset.priceUsd}
            </div>
            <input
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            />
            <button onClick={handleAddButtonClick}>
                Add
            </button>
        </div>
    )
}