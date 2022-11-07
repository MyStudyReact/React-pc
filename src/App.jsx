import { unstable_HistoryRouter as HistoryRouter, BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'

import './App.css'
import WrapperRoutes from '@/router'

//导入history
import { history } from '@/utils/history'

function App () {

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <HistoryRouter history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <WrapperRoutes></WrapperRoutes>
        </Suspense>
      </HistoryRouter>
      {/* </BrowserRouter > */}
    </div>
  )
}

export default App
