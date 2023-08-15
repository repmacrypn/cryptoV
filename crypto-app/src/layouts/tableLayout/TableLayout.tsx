import s from './TableLayout.module.scss'

export const TableLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <table className={s.table}>
            {children}
        </table>
    )
}