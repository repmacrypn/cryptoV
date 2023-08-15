import React from 'react'
import { CryptoCoin } from 'src/types/cryptocoin.interface'

export const AssetsContext = React.createContext<CryptoCoin[] | null>(null)