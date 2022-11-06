import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { Button } from 'antd'

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

      <Button type="primary">Button</Button>
    </div>
  )
}

export default App
