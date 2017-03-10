import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import { TogglesPage } from './togglesPage.es6'
import { ToggleEditPage } from './toggleEditPage.es6'
import { AuditLogPage } from './auditLogPage.es6'

export const AppRouter = (eventStore) => {
  return (
    <Provider store={eventStore}>
        <Router history={browserHistory}>
          <Route path="/" component={TogglesPage}/>
          <Route path="/edit/:toggleId" component={ToggleEditPage}/>
          <Route path="/create" component={ToggleEditPage}/>
          <Route path="/history" component={AuditLogPage}/>
          <Route path="*" component={TogglesPage}/>
        </Router>
    </Provider>
  )
}
