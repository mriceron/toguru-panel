import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { TogglesPage } from './togglesPage.es6'

export const AppRouter = (eventStore) => {
  return (
    <Provider store={eventStore}>
        <Router history={browserHistory}>
          <Route path="/" component={TogglesPage}/>
        </Router>
    </Provider>
  )
}
