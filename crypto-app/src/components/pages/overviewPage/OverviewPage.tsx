import s from './OverviewPage.module.scss'
import { Header } from './header/Header'
import { CurrentProfit } from './profit/CurrentProfit'
import { PortfolioWrapper } from './portfolio/Portfolio'
import { CryptoAssetsTable } from './table/AssetsTable'
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