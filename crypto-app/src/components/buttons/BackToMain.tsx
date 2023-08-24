import { NavLink } from 'react-router-dom'
import s from './Button.module.scss'

export const BackToMain = () => {
    return (
        <NavLink
            className={s.backLink}
            to='/overviewPage'>
            <div className={s.back}>
                Back to main
            </div>
        </NavLink>
    )
}