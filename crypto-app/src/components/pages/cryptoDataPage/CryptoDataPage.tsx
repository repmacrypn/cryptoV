import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { AssetShortInfo } from './short asset info/AssetShortInfo'
import s from './CryptoDataPage.module.scss'
import { Diagram } from './diagram/Diagram'
import { cryptoAPI } from 'src/services/clientService'
import { CryptoCoin } from 'src/types/cryptocoin.interface'
import { HISTORY_INTERVAL } from 'src/utils/constantData'
import { ControlWrapper } from 'src/components/control/Control'
import { BackToMain } from 'src/components/buttons/BackToMain'
import { Preloader } from 'src/components/preloader/Preloader'

export const CryptoDataPage = () => {
    const { id } = useParams()

    const { data: asset = {} as CryptoCoin } = useQuery({
        queryKey: ['assets', id],
        queryFn: () => cryptoAPI.fetchAssetById(id!),
        staleTime: Infinity,
    })

    const { data: history = [], isLoading } = useQuery({
        queryKey: ['assetsHistory', id],
        queryFn: () => cryptoAPI.fetchAssetHistory(id!, HISTORY_INTERVAL),
        staleTime: Infinity,
        enabled: !!asset.id,
    })

    if (isLoading) return <Preloader />

    return (
        <>
            <div className={s.assetInfo}>
                <AssetShortInfo
                    asset={asset}
                />
                <ControlWrapper
                    asset={asset}
                />
            </div>
            <Diagram
                name={asset.name}
                history={history}
            />
            <BackToMain />
        </>
    )
}