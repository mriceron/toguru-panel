import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const SET_TOGGLES = 'SET_TOGGLES'

const defaultState = {
  toggles: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_TOGGLES:
      return Object.assign({}, state, action.toggles)
  }
}

export const setToggles = (toggles) => {
  return {type: SET_TOGGLES, toggles}
}

export const store = createStore(reducer, applyMiddleware(thunk))
