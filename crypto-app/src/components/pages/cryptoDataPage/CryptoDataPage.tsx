import { useQuery } from '@tanstack/react-query'
import { ChartDataset } from 'chart.js'
import { Chart, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import s from './CryptoDataPage.module.scss'
import { cryptoAPI } from 'src/services/clientService'
import { AssetHistory } from 'src/types/assetHistory.interface'
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

    const assetInfo = Object.entries(asset).map(a => {
        if (a[0] === 'explorer') return

        return (
            <AssetInfo
                key={a[0]}
                text={a[0]}
                value={a[1]}
            />
        )
    })

    if (isLoading) return <Preloader />

    return (
        <>
            <div className={s.assetInfo}>
                {assetInfo}
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

export const AssetInfo = ({ text, value }: { text: string; value: string; }) => {
    return (
        <div className={s.info}>
            <div>{text}</div>
            <div>{value || 'none'}</div>
        </div>
    )
}

interface DiagramProps {
    name: string;
    history: AssetHistory[];
}

export const Diagram = ({ history, name }: DiagramProps) => {

    const labels = history.map((curTimeObj: AssetHistory) => new Date(curTimeObj.time).toLocaleString())
    const datasets = history.map((curTimeObj: AssetHistory) => curTimeObj.priceUsd)

    Chart.register(...registerables)
    const data = {
        labels,
        datasets: [
            {
                label: `${name} chart history for the last month`,
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

    return (
        <div>
            <Line data={data} />
        </div>
    )
}