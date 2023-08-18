import { SquareArrowDown } from 'tabler-icons-react'
import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import s from './OverviewPage.module.scss'
import { TableHeading, tableHeadings } from 'src/utils/cryptoTableHeaders'
import { cryptoAPI } from 'src/services/clientService'
import { CryptoCoin } from 'src/types/cryptocoin.interface'
import { TableLayout } from 'src/components/layouts/tableLayout/TableLayout'
import { PaginationList } from 'src/components/layouts/paginlistLayout/PaginationList'
import { PageContext/* , PortfolioAssetsContext */ } from 'src/contexts/Contexts'
import { BALANCE, TABLE_LIMIT, TOP_ASSETS } from 'src/utils/constantData'
import { NavLink } from 'react-router-dom'
import { Modal } from 'src/components/modal/Modal'
import { SubmitField } from 'src/components/submit field/SubmitField'
/* import { usePortfolioAssetsContext } from 'src/hooks/usePortfolioAsssetsContext' */
import { PortfolioAsset } from 'src/types/PortfolioAsset.interface'
import { usePortfolioAssetsContext } from 'src/hooks/usePortfolioAsssetsContext'

export const OverviewPage = () => {
    /* const portfolioArray: PortfolioAsset[] = []

    const keys: string[] = Object.keys(localStorage)
    for (const key of keys) {
        portfolioArray.push(JSON.parse(localStorage.getItem(key)!))
    }

    const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>(portfolioArray) */
    return (
        <div>
            <header>
                <Header />
                <CurrentProfit />
                <PortfolioWrapper />
            </header>
            <PaginationList>
                <CryptoAssetsTable />
            </PaginationList>
        </div>
        /* <PortfolioAssetsContext.Provider value={{ portfolioAssets, setPortfolioAssets }}> */
        /* </PortfolioAssetsContext.Provider> */
    )
}

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

export const ControlWrapper = ({ asset }: { asset: CryptoCoin }) => {
    const [isActive, setIsActive] = useState(false)

    return (
        <div data-th='Add Coin:'>
            <Control
                setIsActive={setIsActive}
            />
            <Modal
                isActive={isActive}
                setIsActive={setIsActive}
            >
                <SubmitField portfolioAsset={asset} />
            </Modal>
        </div>
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

interface ControlProps {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Control = ({ setIsActive }: ControlProps) => {
    return (
        <div
            onClick={() => setIsActive(true)}
            className={s.control}>
            +
        </div>
    )
}

export const PortfolioWrapper = () => {
    const [isActive, setIsActive] = useState(false)

    return (
        <div>
            <div onClick={() => setIsActive(true)}>
                dratuti
            </div>
            <div>

            </div>
            <Modal
                isActive={isActive}
                setIsActive={setIsActive}
            >
                <Portfolio />
            </Modal>
        </div>
    )
}

export const CurrentProfit = () => {
    const portfolioAssets: string[] = Object.keys(localStorage)
    console.log(portfolioAssets)
    const { initialBalance } = usePortfolioAssetsContext()
    const diffBalance = Math.abs(BALANCE - initialBalance)
    const diffPercent = diffBalance / BALANCE * 100
    const diffValue = `${diffBalance} (${diffPercent.toFixed(2)}%)`

    return (
        <div>
            {initialBalance}{' USD '}
            {initialBalance > BALANCE ? `+${diffValue}` : `-${diffValue}`}
        </div>
    )
}

export const Portfolio = () => {
    const { portfolioAssets, setPortfolioAssets, setInitialBalance } = usePortfolioAssetsContext()

    const handleDeleteClick = (id: string) => {
        const asset: PortfolioAsset = JSON.parse(localStorage.getItem(id)!)
        const balance: number = Number(localStorage.getItem('balance'))
        const balanceDiff = balance + asset.count * +asset.priceUsd
        setInitialBalance(balanceDiff)
        localStorage.setItem('balance', String(balanceDiff))

        setPortfolioAssets(portfolioAssets.filter((p: PortfolioAsset) => p.id !== id))
        localStorage.removeItem(id)
    }

    const portfolioAssetsResult = portfolioAssets.map((asset: PortfolioAsset) =>
        <div key={asset.id}>
            <span>{asset.count}</span>{': '}
            <span>{asset.name}</span>{' '}
            <span>{asset.symbol}</span>
            <span>{asset.priceUsd}</span>
            <span onClick={() => handleDeleteClick(asset.id)}>delete</span>
        </div>,
    )

    return (
        <div>{portfolioAssetsResult}</div>
    )
}