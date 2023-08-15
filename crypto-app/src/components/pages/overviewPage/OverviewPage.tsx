import { SquareArrowDown, ChevronLeft, ChevronRight } from 'tabler-icons-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import s from './OverviewPage.module.scss'
import { TableHeading, tableHeadings } from 'src/utils/cryptoTableHeaders'
import { TableLayout } from 'src/layouts/tableLayout/TableLayout'
import { cryptoAPI, total } from 'src/services/clientService'
import ReactPaginate from 'react-paginate'
import { AssetsContext } from 'src/contexts/Contexts'
import { useAssetsContext } from 'src/hooks/useAssetsContext'
import { CryptoCoin } from 'src/types/cryptocoin.interface'

export const OverviewPage = () => {
    return (
        <div>
            <header>
                current info
            </header>
            <PaginationList />
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

export const PaginationList = () => {
    const [page, setPage] = useState(0)

    const handlePageChange = ({ selected }: { selected: number }): void => {
        setPage(selected)
    }

    const { data: assets = [], isFetching } = useQuery({
        queryKey: ['assets', page],
        queryFn: () => cryptoAPI.fetchAssets(page),
    })

    if (isFetching) return <div>qq</div>

    return (
        <main>
            <AssetsContext.Provider value={assets}>
                <CryptoAssetsTable />
            </AssetsContext.Provider>
            <ReactPaginate
                previousLabel={
                    <ChevronLeft
                        className={s.icon}
                        viewBox="0 0 24 24"
                        height={14}
                        width={20}
                    />
                }
                nextLabel={
                    <ChevronRight
                        className={s.icon}
                        viewBox="-2 0 24 24"
                        height={14}
                        width={20}
                    />
                }
                breakLabel={null}
                pageCount={total}
                marginPagesDisplayed={0}
                pageRangeDisplayed={4}
                onPageChange={handlePageChange}
                forcePage={page}
                containerClassName={s.pagination}
                breakClassName={s.navLi}
                previousClassName={s.navLi}
                nextClassName={s.navLi}
                pageClassName={s.navLi}
                activeLinkClassName={s.active}
                breakLinkClassName={s.navA}
                pageLinkClassName={s.navA}
                previousLinkClassName={`${s.navA} ${s.moveButton}`}
                nextLinkClassName={`${s.navA} ${s.moveButton}`}
            />
        </main>
    )
}

export const TableBody = () => {
    const assets = useAssetsContext()

    const assetsRows = assets.map((asset: CryptoCoin) => {
        return (
            <UserTableInfo
                key={asset.id}
                asset={asset}
            />
        )
    })

    return (
        <tbody>
            {assetsRows}
        </tbody>
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