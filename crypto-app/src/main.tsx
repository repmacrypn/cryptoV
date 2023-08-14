/* eslint-disable indent */
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <QueryClientProvider client={queryClient} >
      <App />
      < ReactQueryDevtools />
    </QueryClientProvider>
  </HashRouter>,
)
