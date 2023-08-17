import { useState } from 'react'
import { PortfolioAsset } from 'src/types/PortfolioAsset.interface'
import { usePortfolioAssetsContext } from 'src/hooks/usePortfolioAsssetsContext'
import { CryptoCoin } from 'src/types/cryptocoin.interface'

export const SubmitField = ({ portfolioAsset }: { portfolioAsset: CryptoCoin }) => {
    const [inputValue, setInputValue] = useState('')
    const { portfolioAssets, setPortfolioAssets } = usePortfolioAssetsContext()

    const handleAddButtonClick = () => {
        if (isNaN(+inputValue) || +inputValue === 0) {
            alert('Input string must be a number and not a 0!')
            return
        }

        let count: number | undefined
        const id = portfolioAsset.id
        const asset: PortfolioAsset = JSON.parse(localStorage.getItem(id)!)

        if (asset) {
            count = asset.count + +inputValue

            localStorage.removeItem(id)
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

        localStorage.setItem(id, JSON.stringify({ ...portfolioAsset, count: count || +inputValue } as PortfolioAsset))
    }

    return (
        <div>
            <div>
                {portfolioAsset.name}{': '}
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