import React from 'react'
import ReactDOM from 'react-dom/client'
import { VFXProvider } from 'react-vfx'
import { cn } from '@client/lib/utils'
import App from '@client/pages/App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className={cn('mx-auto max-w-[1200px] @container/Root')}>
      <VFXProvider>
        <App />
      </VFXProvider>
    </div>
  </React.StrictMode>
)
