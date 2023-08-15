import { nanoid } from 'nanoid'

export interface TableHeading {
    id: string;
    name: string;
}

export const tableHeadings: TableHeading[] = [
    { name: 'Name', id: nanoid() },
    { name: 'Symbol', id: nanoid() },
    { name: 'Supply', id: nanoid() },
    { name: 'PriceUsd', id: nanoid() },
]