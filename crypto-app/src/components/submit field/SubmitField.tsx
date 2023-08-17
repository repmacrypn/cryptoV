import { useState } from 'react'
import { CryptoCoin } from 'src/types/cryptocoin.interface'

export const SubmitField = ({ portfolioAsset }: { portfolioAsset: CryptoCoin }) => {
    const [inputValue, setInputValue] = useState('')

    const handleAddButtonClick = () => {

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