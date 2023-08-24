import { TrendingUp } from 'tabler-icons-react'
import { useQuery } from '@tanstack/react-query'
import s from './Header.module.scss'
import { cryptoAPI } from 'src/services/clientService'
import { CryptoCoin } from 'src/types/cryptocoin.interface'
import { TOP_ASSETS } from 'src/utils/constantData'


export const Header = () => {
    const { data: assets = [], isLoading } = useQuery({
        queryKey: ['topAssets'],
        queryFn: () => cryptoAPI.fetchAssets({ offset: 0, ids: TOP_ASSETS }),
        staleTime: Infinity,
    })

    const topAssets = assets.map((asset: CryptoCoin) => {
        return (
            <div key={asset.id} className={s.topAsset}>
                <div>
                    <span>{asset.name}</span>
                    <span className={s.stick}>|</span>
                </div>
                <div>
                    {asset.symbol}{' '}
                    <TrendingUp viewBox="0 -5 24 24" />
                </div>
            </div>
        )
    })

    if (isLoading) return (
        <div className={s.loadingHeader}></div>
    )

    return (
        <header className={s.header}>
            {topAssets}
        </header>
    )
}