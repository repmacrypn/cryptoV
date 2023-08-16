import { useQuery } from '@tanstack/react-query'
import { NavLink, useParams } from 'react-router-dom'
import { cryptoAPI } from 'src/services/clientService'
import { CryptoCoin } from 'src/types/cryptocoin.interface'

export const CryptoDataPage = () => {
    const { id } = useParams()

    const { data: asset = {} as CryptoCoin, isLoading } = useQuery({
        queryKey: ['assets', id],
        queryFn: () => cryptoAPI.fetchAssetById(id!),
        staleTime: Infinity,
    })

    if (isLoading) return <div>qq</div>

    return (
        <div>
            <div>
                <div>name: {asset.name} {asset.symbol}</div>
                <div>supply: {asset.supply}</div>
                <div>maxSupply: {asset.maxSupply}</div>
                <div>priceUsd: {asset.priceUsd}</div>
                <div>marketCapUsd: {asset.marketCapUsd}</div>
                <div>changePercent24Hr: {asset.changePercent24Hr}</div>
                <div>vwap24Hr: {asset.vwap24Hr}</div>
                <div>volumeUsd24Hr: {asset.volumeUsd24Hr}</div>
                <div>+</div>
            </div>
            <NavLink to='/overviewPage'>
                <div>
                    Back
                </div>
            </NavLink>
        </div>
    )
}