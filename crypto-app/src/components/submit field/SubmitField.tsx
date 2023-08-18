import { useState } from 'react'
import { PortfolioAsset } from 'src/types/PortfolioAsset.interface'
import { usePortfolioAssetsContext } from 'src/hooks/usePortfolioAsssetsContext'
import { CryptoCoin } from 'src/types/cryptocoin.interface'

export const SubmitField = ({ portfolioAsset }: { portfolioAsset: CryptoCoin }) => {
    const [inputValue, setInputValue] = useState('')
    const { portfolioAssets, setPortfolioAssets, initialBalance, setInitialBalance } = usePortfolioAssetsContext()

    const handleAddButtonClick = () => {
        if (isNaN(+inputValue) || +inputValue === 0) {
            alert('Input string must be a number and not a 0!')
            return
        }

        const totalBuyCount = +inputValue * +portfolioAsset.priceUsd

        if (totalBuyCount > initialBalance) {
            alert('Invalid operation! Replenish the balance!')
            return
        }

        let count: number | undefined
        const id = portfolioAsset.id
        const asset: PortfolioAsset = JSON.parse(localStorage.getItem(id)!)

        if (asset) {
            count = asset.count + +inputValue

            setPortfolioAssets(portfolioAssets.map((asset: PortfolioAsset) => {
                return asset.id === id ? { ...asset, count: count! } : asset
            }))
        } else {
            setPortfolioAssets([
                ...portfolioAssets,
                {
                    ...portfolioAsset,
                    count: +inputValue,
                },
            ])
        }

        setInitialBalance(initialBalance - totalBuyCount)

        localStorage.setItem(id, JSON.stringify({ ...portfolioAsset, count: count || +inputValue } as PortfolioAsset))
        localStorage.setItem('balance', String(initialBalance - totalBuyCount))
    }

    return (
        <div>
            <div>
                {portfolioAsset.name}{'; '}
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