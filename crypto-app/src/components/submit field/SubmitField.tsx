import { useState } from 'react'
import s from './SubmitField.module.scss'
import { usePortfolioAssetsContext } from 'src/hooks/usePortfolioAsssetsContext'
import { CryptoCoin } from 'src/types/cryptocoin.interface'
import storage from 'src/storage/storage'
import { Button } from '../buttons/Button'

export const SubmitField = ({ portfolioAsset }: { portfolioAsset: CryptoCoin }) => {
    const [inputValue, setInputValue] = useState('')
    const { portfolioAssets, initialBalance, setPortfolioAssets, setInitialBalance } = usePortfolioAssetsContext()

    const checkIfIsNaN = (numValue: number): boolean => {
        if (isNaN(numValue) || numValue <= 0) {
            alert('Input string must be a number and > 0!')
            return false
        }

        return true
    }

    const checkIfIsValid = (totalBuy: number, balance: number): boolean => {
        if (totalBuy > balance) {
            alert('Invalid operation! Replenish the balance!')
            return false
        }

        return true
    }

    const addPortfolioData = (numValue: number, totalBuy: number): void => {
        const id: string = portfolioAsset.id
        const count: number | undefined = storage.get(id)?.count

        if (count) {
            storage.set(id, { count: numValue + count, priceUsd: portfolioAsset.priceUsd })
        } else {
            storage.set(id, { count: numValue, priceUsd: portfolioAsset.priceUsd })
            setPortfolioAssets([...portfolioAssets, portfolioAsset])
        }

        setInitialBalance(prev => prev - totalBuy)
    }

    const handleAddButtonClick = () => {
        const numInputValue: number = Number(inputValue)
        const totalBuyCount: number = numInputValue * Number(portfolioAsset.priceUsd)

        if (!checkIfIsNaN(numInputValue)) return
        if (!checkIfIsValid(totalBuyCount, initialBalance)) return
        addPortfolioData(numInputValue, totalBuyCount)
    }

    return (
        <div>
            <div>
                {portfolioAsset.name}{' '}
                price: {portfolioAsset.priceUsd}
            </div>
            <div className={s.submitField}>
                <input
                    className={s.input}
                    value={inputValue}
                    placeholder='Enter total buy...'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                />
                <Button
                    text='Add'
                    handleButtonClick={handleAddButtonClick}
                />
            </div>
        </div>
    )
}