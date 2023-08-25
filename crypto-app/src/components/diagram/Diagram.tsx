import { ChartDataset } from 'chart.js'
import { Chart, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2'
import s from './Diagram.module.scss'
import { AssetHistory } from 'src/types/assetHistory.interface'

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
        <div className={s.diagram}>
            <Line options={{ responsive: true, maintainAspectRatio: false }} data={data} />
        </div>
    )
}