import React from 'react'
import ReactDOM from 'react-dom'

import { AppRouter } from './router.es6'
import { store } from './state/store.es6'

ReactDOM.render(
  AppRouter(store),
  document.getElementById('content')
)
