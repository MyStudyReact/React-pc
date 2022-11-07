import { unstable_HistoryRouter as HistoryRouter, BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { Spin } from 'antd'

import './App.css'
import WrapperRoutes from '@/router'

//导入history
import { history } from '@/utils/history'

function App () {

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <HistoryRouter history={history}>
        <Suspense fallback={<Spin size="large" className='spinClass' />}>
          <WrapperRoutes></WrapperRoutes>
        </Suspense>
      </HistoryRouter>
      {/* </BrowserRouter > */}
    </div>
  )
}

export default App
