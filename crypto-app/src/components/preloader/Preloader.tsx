import s from './Preloader.module.scss'
import preloader from 'src/assets/preloader.svg'

export const Preloader = () => {
    return (
        <div className={s.preloader}>
            <img alt='preloader' src={preloader} />
        </div>
    )
}