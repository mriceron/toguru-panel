import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'

import { TogglesPage } from './togglesPage.es6'
import { ToggleEditPage } from './toggleEditPage.es6'
import { AuditLogPage } from './auditLogPage.es6'

export const AppRouter = (eventStore) => {
  return (
    <Provider store={eventStore}>
        {isHashRoutingEnabled(eventStore) ?
          <HashRouter><RouteSwitch/></HashRouter> :
          <BrowserRouter><RouteSwitch/></BrowserRouter>
        }
    </Provider>
  )
}

const isHashRoutingEnabled = eventStore =>
  eventStore.getState().config.hashRouting == true

const RouteSwitch = () => (
  <Switch>
    <Route exact path="/" component={TogglesPage}/>
    <Route path="/edit/:toggleId" component={ToggleEditPage}/>
    <Route path="/create" component={ToggleEditPage}/>
    <Route path="/history" component={AuditLogPage}/>
    <Route path="*" component={TogglesPage}/>
  </Switch>
)
