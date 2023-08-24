import s from './OverviewPage.module.scss'
import { Header } from '../../components/header/Header'
import { CurrentProfit } from '../../components/profit/CurrentProfit'
import { PortfolioWrapper } from '../../components/portfolio/Portfolio'
import { CryptoAssetsTable } from '../../components/table/AssetsTable'
import { PaginationList } from 'src/components/layouts/paginlistLayout/PaginationList'

export const OverviewPage = () => {
    return (
        <>
            <Header />
            <div className={s.portfolioWrapper}>
                <CurrentProfit />
                <PortfolioWrapper />
            </div>
            <PaginationList>
                <CryptoAssetsTable />
            </PaginationList>
        </>
    )
}