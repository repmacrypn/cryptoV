import { ChevronLeft, ChevronRight } from 'tabler-icons-react'
import ReactPaginate from 'react-paginate'
import { useState } from 'react'
import s from './PaginationList.module.scss'
import { PageContext } from 'src/contexts/Contexts'
import { BUTTONS_NUM } from 'src/utils/constantData'

export const PaginationList = ({ children }: { children: React.ReactNode }) => {
    const [page, setPage] = useState(0)

    const handlePageChange = ({ selected }: { selected: number }): void => {
        setPage(selected)
    }

    return (
        <main>
            <PageContext.Provider value={page}>
                {children}
            </PageContext.Provider>
            <ReactPaginate
                previousLabel={
                    <ChevronLeft
                        className={s.icon}
                        viewBox="0 0 24 24"
                        height={14}
                        width={20}
                    />
                }
                nextLabel={
                    <ChevronRight
                        className={s.icon}
                        viewBox="-2 0 24 24"
                        height={14}
                        width={20}
                    />
                }
                breakLabel={'...'}
                pageCount={BUTTONS_NUM}
                marginPagesDisplayed={2}
                pageRangeDisplayed={4}
                onPageChange={handlePageChange}
                forcePage={page}
                containerClassName={s.pagination}
                breakClassName={s.navLi}
                previousClassName={s.navLi}
                nextClassName={s.navLi}
                pageClassName={s.navLi}
                activeLinkClassName={s.active}
                breakLinkClassName={s.navA}
                pageLinkClassName={s.navA}
                previousLinkClassName={`${s.navA} ${s.moveButton}`}
                nextLinkClassName={`${s.navA} ${s.moveButton}`}
            />
        </main>
    )
}