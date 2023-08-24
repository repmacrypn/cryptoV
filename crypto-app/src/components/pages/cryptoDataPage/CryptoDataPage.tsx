import { useQuery } from '@tanstack/react-query'
import { ChartDataset } from 'chart.js'
import { Chart, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { NavLink, useParams } from 'react-router-dom'
import { cryptoAPI } from 'src/services/clientService'
import { AssetHistory } from 'src/types/assetHistory.interface'
import { CryptoCoin } from 'src/types/cryptocoin.interface'
import { HISTORY_INTERVAL } from 'src/utils/constantData'
import { ControlWrapper } from 'src/components/control/Control'

//сделать page более глобальным чтоб пагинация в 0 не уходила

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

    const labels = history.map((curTimeObj: AssetHistory) => new Date(curTimeObj.time).toLocaleString())
    const datasets = history.map((curTimeObj: AssetHistory) => curTimeObj.priceUsd)

    Chart.register(...registerables)
    const data = {
        labels,
        datasets: [
            {
                label: `${asset.name} chart history for the last hour`,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: datasets,
            } as ChartDataset<'line', string[]>,
        ],
    }

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
                <ControlWrapper
                    asset={asset}
                />
            </div>
            <div>
                <Line data={data} />
            </div>
            <NavLink to='/overviewPage'>
                <div>
                    Back
                </div>
            </NavLink>
        </div>
    )
}