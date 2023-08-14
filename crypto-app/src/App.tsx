/* eslint-disable indent */
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import { OverviewPage } from './components/pages/overviewPage/OverviewPage'
import { CryptoDataPage } from './components/pages/cryptoDataPage/CryptoDataPage'
import { PageNotFound } from './components/pages/pageNotFound/PageNotFound'

function App() {
  return (
    <div className='appWrapper'>
      <Routes>
        <Route path='/' element={<Navigate to='/overviewPage' />} />
        < Route path='/overviewPage' element={< OverviewPage />} />
        < Route path='/cryptoDataPage' element={< CryptoDataPage />} />
        < Route path='*' element={< PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
