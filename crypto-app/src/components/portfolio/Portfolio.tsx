import { useState, useMemo } from 'react'
import s from './Portfolio.module.scss'
import { CryptoCoin } from 'src/types/cryptocoin.interface'
import { Modal } from 'src/components/modal/Modal'
import { usePortfolioAssetsContext } from 'src/hooks/usePortfolioAsssetsContext'
import storage from 'src/storage/storage'
import { Button } from 'src/components/buttons/Button'

export const PortfolioWrapper = () => {
    const [isActive, setIsActive] = useState(false)

    return (
        <>
            <div
                className={s.portfolio}
                onClick={() => setIsActive(true)}
            >
                Portfolio
            </div>
            <Modal
                isActive={isActive}
                setIsActive={setIsActive}
            >
                <Portfolio />
            </Modal>
        </>
    )
}

export const Portfolio = () => {
    const { portfolioAssets, initialBalance, setPortfolioAssets, setInitialBalance } = usePortfolioAssetsContext()

    const getBalanceDiff = useMemo(() => (id: string): number => {
        const count: number | undefined = storage.get(id)?.count
        const priceUsd: string | undefined = portfolioAssets.find((p: CryptoCoin) => p.id === id)?.priceUsd
        const balanceDiff = initialBalance + Number(count!) * Number(priceUsd!)

        return balanceDiff
    }, [initialBalance, portfolioAssets])

    const handleDeleteClick = (id: string): void => {
        const balanceDiff = getBalanceDiff(id)

        setInitialBalance(balanceDiff)
        setPortfolioAssets(portfolioAssets.filter((p: CryptoCoin) => p.id !== id))

        storage.removeItem(id)
    }

    const portfolioAssetsResult = portfolioAssets.map((p: CryptoCoin) =>
        <div className={s.asset} key={p.id}>
            <div className={s.assetContent}>
                <div>count: {storage.get(p.id)?.count} — </div>
                <div>{p.name}</div>
                <div>{p.symbol}</div>
                <div>{p.priceUsd}</div>
            </div>
            <Button
                text='Delete'
                handleButtonClick={() => handleDeleteClick(p.id)}
            />
        </div>,
    )

    return (
        <>
            {portfolioAssetsResult.length ?
                portfolioAssetsResult : 'No assets in portfolio yet :('}
        </>
    )
}