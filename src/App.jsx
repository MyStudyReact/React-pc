import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'

import './App.css'
import WrapperRoutes from '@/router'

function App () {

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <WrapperRoutes></WrapperRoutes>
        </Suspense>
      </BrowserRouter >
    </div>
  )
}

export default App
