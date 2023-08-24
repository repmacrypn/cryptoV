import s from './AssetShortInfo.module.scss'
import { CryptoCoin } from 'src/types/cryptocoin.interface'

export const AssetShortInfo = ({ asset }: { asset: CryptoCoin }) => {
    const assetInfo = Object.entries(asset).map((a: [string, string]) => {
        if (a[0] === 'explorer') return
        return (
            <AssetInfo
                key={a[0]}
                text={a[0]}
                value={a[1]}
            />
        )
    })

    return (
        <>{assetInfo}</>
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