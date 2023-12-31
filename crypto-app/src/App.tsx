/* eslint-disable indent */
import { useEffect, useState, useCallback } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import './App.scss'
import { OverviewPage } from './pages/overviewPage/OverviewPage'
import { CryptoDataPage } from './pages/cryptoDataPage/CryptoDataPage'
import { PageNotFound } from './pages/pageNotFound/PageNotFound'
import { PortfolioAssetsContext } from './contexts/Contexts'
import { cryptoAPI } from './services/clientService'
import storage from './storage/storage'
import { CryptoCoin } from './types/cryptocoin.interface'
import { BALANCE } from './utils/constantData'

function App() {
  const portfolioAssetsKeys: string[] = Object.keys(localStorage)
  const ids = portfolioAssetsKeys.join(',')

  const { data: curAssets = [] } = useQuery({
    queryKey: ['portfolioAssets'],
    queryFn: () => cryptoAPI.fetchAssets({ offset: 0, ids }),
    staleTime: Infinity,
    enabled: !!localStorage.length,
  })

  const [portfolioAssets, setPortfolioAssets] = useState<CryptoCoin[]>([] as CryptoCoin[])
  const [initialBalance, setInitialBalance] = useState<number>(BALANCE)

  const countAssetsDiff = useCallback(() => {
    let diff = 0
    const keys: string[] = Object.keys(localStorage)
    for (const key of keys) {
      diff += Number(storage.get(key)?.priceUsd) * Number(storage.get(key)?.count)
    }

    return diff
  }, [])

  useEffect(() => {
    const diff: number = countAssetsDiff()

    let curDiff = 0
    for (const curAsset of curAssets) {
      curDiff += Number(curAsset.priceUsd) * Number(storage.get(curAsset.id)?.count)
    }

    if (curAssets.length) {
      setInitialBalance(BALANCE - 2 * diff + curDiff)
      setPortfolioAssets(curAssets)
    }
  }, [curAssets, countAssetsDiff])

  return (
    <div className='appWrapper'>
      <PortfolioAssetsContext.Provider value={
        { portfolioAssets, setPortfolioAssets, initialBalance, setInitialBalance }
      }>
        <Routes>
          <Route path='/' element={<Navigate to='/overviewPage' />} />
          < Route path='/overviewPage' element={< OverviewPage />} />
          < Route path='/cryptoDataPage/:id' element={< CryptoDataPage />} />
          < Route path='*' element={< PageNotFound />} />
        </Routes>
      </PortfolioAssetsContext.Provider>
    </div>
  )
}

export default App
