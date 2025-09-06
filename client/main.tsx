import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { LoadingProvider, GlobalLoadingOverlay } from '@/loading/context'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <LoadingProvider>
      <App />
      <GlobalLoadingOverlay />
    </LoadingProvider>
  </Provider>
)
