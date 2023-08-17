/* eslint-disable indent */
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import { OverviewPage } from './components/pages/overviewPage/OverviewPage'
import { CryptoDataPage } from './components/pages/cryptoDataPage/CryptoDataPage'
import { PageNotFound } from './components/pages/pageNotFound/PageNotFound'
import { PortfolioAssetsContext } from './contexts/Contexts'
import { useState } from 'react'
import { PortfolioAsset } from './types/PortfolioAsset.interface'

function App() {
  const portfolioArray: PortfolioAsset[] = []

  const keys: string[] = Object.keys(localStorage)
  for (const key of keys) {
    portfolioArray.push(JSON.parse(localStorage.getItem(key)!))
  }

  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>(portfolioArray)

  return (
    <div className='appWrapper'>
      <PortfolioAssetsContext.Provider value={{ portfolioAssets, setPortfolioAssets }}>
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
