import { SquareArrowDown } from 'tabler-icons-react'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import s from './OverviewPage.module.scss'
import { TableHeading, tableHeadings } from 'src/utils/cryptoTableHeaders'
import { cryptoAPI } from 'src/services/clientService'
import { CryptoCoin } from 'src/types/cryptocoin.interface'
import { TableLayout } from 'src/components/layouts/tableLayout/TableLayout'
import { PaginationList } from 'src/components/layouts/paginlistLayout/PaginationList'
import { PageContext } from 'src/contexts/Contexts'
import { TABLE_LIMIT, TOP_ASSETS } from 'src/utils/constantData'

export const OverviewPage = () => {
    return (
        <div>
            <header>
                <Header />
            </header>
            <PaginationList>
                <CryptoAssetsTable />
            </PaginationList>
        </div>
    )
}

export const CryptoAssetsTable = () => {
    return (
        <TableLayout>
            <TableHeadings />
            <TableBody />
        </TableLayout>
    )
}

export const TableBody = () => {
    const page = useContext(PageContext)

    const { data: assets = [], isLoading } = useQuery({
        queryKey: ['assets', page],
        queryFn: () => cryptoAPI.fetchAssets({ offset: page, limit: TABLE_LIMIT }),
        keepPreviousData: true,
        staleTime: 1000 * 5 * 60,
    })

    const assetsRows = assets.map((asset: CryptoCoin) => {
        return (
            <UserTableInfo
                key={asset.id}
                asset={asset}
            />
        )
    })

    if (isLoading) return <tbody>qq</tbody>

    return (
        <tbody>
            {assetsRows}
        </tbody>
    )
}

export const Header = () => {
    const { data: assets = [], isLoading } = useQuery({
        queryKey: ['topAssets'],
        queryFn: () => cryptoAPI.fetchAssets({ offset: 0, ids: TOP_ASSETS }),
        staleTime: Infinity,
    })

    const topAssets = assets.map((asset: CryptoCoin) => {
        return (
            <div key={asset.id}>
                {asset.name} {asset.symbol}{'  '}
            </div>
        )
    })

    if (isLoading) return <div>qq</div>

    return (
        <header>
            {topAssets}
        </header>
    )
}

const UserTableInfo = ({ asset }: { asset: CryptoCoin }) => {
    /* const getUserShortInfo = () => {
        dispatch(setCurrentUser(user))
        if (!isShortInfoVisible) dispatch(setIsVisible(true))
    } */
    return (
        <tr
            className={s.userTableRow}
        /* onClick={getUserShortInfo} */
        >
            <td data-th='Name:'>{asset.name}</td>
            <td data-th='Symbol:'>{asset.symbol}</td>
            <td data-th='Supply:'>{asset.supply}</td>
            <td data-th='PriceUsd:'>{asset.priceUsd}</td>
            <td data-th='Add Coin:'>+</td>
        </tr>
    )
}

export const TableHeadings = () => {

    const completedHeadings = tableHeadings.map((heading: TableHeading) => (
        <th
            className={`${s.tableHeadingTitle}`}
            key={heading.id}
        >
            {heading.name}
            <SquareArrowDown
                className={s.icon}
                viewBox="0 -5 24 24"
                height={16}
                width={26}
            />
        </th>
    ))

    return (
        <thead >
            <tr>{completedHeadings}</tr>
        </thead >
    )
}