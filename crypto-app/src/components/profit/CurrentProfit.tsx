import s from './CurrentProfit.module.scss'
import { usePortfolioAssetsContext } from 'src/hooks/usePortfolioAsssetsContext'
import { BALANCE } from 'src/utils/constantData'

export const CurrentProfit = () => {
    const { initialBalance } = usePortfolioAssetsContext()

    const getAssetsProfit = (balance: number): string => {
        const diffBalance = Math.abs(BALANCE - balance)
        const diffPercent = diffBalance / BALANCE * 100
        const diffValue = `${diffBalance} (${diffPercent.toFixed(2)}%)`

        return diffValue
    }

    const diffValue = getAssetsProfit(initialBalance)

    return (
        <div className={s.profit}>
            <div className={`${s.balanceTitle} ${s.profitValue}`}>
                Balance:
            </div>
            <div className={s.profitValue}>
                {initialBalance} USD
            </div>
            <div className={s.profitValue}>
                {initialBalance >= BALANCE ? `+${diffValue}` : `-${diffValue}`}
            </div>
        </div>
    )
} 