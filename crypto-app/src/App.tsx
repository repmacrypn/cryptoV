/* eslint-disable indent */
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import { OverviewPage } from './components/pages/overviewPage/OverviewPage'
import { CryptoDataPage } from './components/pages/cryptoDataPage/CryptoDataPage'
import { PageNotFound } from './components/pages/pageNotFound/PageNotFound'
import { PortfolioAssetsContext } from './contexts/Contexts'
import { useEffect, useState } from 'react'
import { PortfolioAsset } from './types/PortfolioAsset.interface'
import { BALANCE } from './utils/constantData'
import { getPortfolioArray } from './utils/getPortfolioArray'

function App() {
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>(getPortfolioArray)
  const [initialBalance, setInitialBalance] = useState<number>(Number(localStorage.getItem('balance')) || BALANCE)

  useEffect(() => {
    localStorage.setItem('balance', String(initialBalance))
  }, [initialBalance])

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
