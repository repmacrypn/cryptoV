import s from './PageNotFound.module.scss'
/* import { BackToSearch } from '../../profilePage/ProfilePage' */

export const PageNotFound = () => {
    return (
        <div className={`defaultfontS ${s.demoMessageAlertWrapper}`}>
            {/* <BackToSearch /> */}
            <div className={`bold700 ${s.demoMessageAlert}`}>
                404 NOT FOUND
            </div>
        </div>
    )
}