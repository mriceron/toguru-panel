import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'

import { AppRouter } from './router.es6'

function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

ReactDOM.render(
  AppRouter(createStore(counter)),
  document.getElementById('content')
)
