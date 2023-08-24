import { SquareArrowDown } from 'tabler-icons-react'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import s from './AssetsTable.module.scss'
import { TableHeading, tableHeadings } from 'src/utils/cryptoTableHeaders'
import { cryptoAPI } from 'src/services/clientService'
import { CryptoCoin } from 'src/types/cryptocoin.interface'
import { TableLayout } from 'src/components/layouts/tableLayout/TableLayout'
import { PageContext } from 'src/contexts/Contexts'
import { TABLE_LIMIT } from 'src/utils/constantData'
import { ControlWrapper } from 'src/components/control/Control'

export const CryptoAssetsTable = () => {
    return (
        <>
            <TableLayout>
                <TableHeadings />
                <TableBody />
            </TableLayout>
        </>
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

export const TableBody = () => {
    const page = useContext(PageContext)

    const { data: assets = [], isLoading } = useQuery({
        queryKey: ['assets', page],
        queryFn: () => cryptoAPI.fetchAssets({ offset: page, limit: TABLE_LIMIT }),
        keepPreviousData: true,
        staleTime: 1000 * 60,
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

const UserTableInfo = ({ asset }: { asset: CryptoCoin }) => {
    return (
        <tr
            className={s.userTableRow}
        >
            <Th
                dataTh='Name:'
                value={asset.name}
                id={asset.id}
            />
            <Th
                dataTh='Symbol:'
                value={asset.symbol}
                id={asset.id}
            />
            <Th
                dataTh='Supply:'
                value={asset.supply}
                id={asset.id}
            />
            <Th
                dataTh='PriceUsd:'
                value={asset.priceUsd}
                id={asset.id}
            />
            <td>
                <ControlWrapper
                    asset={asset}
                />
            </td>
        </tr>
    )
}

interface ThProps {
    dataTh: string;
    value: string;
    id: string;
}

export const Th = ({ dataTh, value, id }: ThProps) => {
    return (
        <td data-th={dataTh}>
            <NavLink to={`/cryptoDataPage/${id}`}>
                {value}
            </NavLink>
        </td>
    )
}