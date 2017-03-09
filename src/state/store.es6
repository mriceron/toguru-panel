import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { arrayToObject } from './../utils.es6'

const SET_TOGGLES = 'SET_TOGGLES'
const SET_TOGGLE = 'SET_TOGGLE'
const SET_API_KEY = 'SET_API_KEY'

const API_KEY = 'API_KEY'

const defaultState = {
  toggles: {},
  apiKey: localStorage.getItem(API_KEY)
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_TOGGLES:
      return Object.assign({}, state, {toggles: arrayToObject(action.toggles, "id")})
    case SET_TOGGLE:
      return Object.assign({}, state, {toggles: Object.assign({}, state.toggles, action.toggle)})
    case SET_API_KEY:
      localStorage.setItem(API_KEY, action.apiKey)
      return Object.assign({}, state, {apiKey: action.apiKey})
    default:
      return state
  }
}

export const setApiKey = apiKey => {
  return {type: SET_API_KEY, apiKey}
}

export const setToggles = toggles => {
  return {type: SET_TOGGLES, toggles}
}

export const setToggle = toggle => {
  return {type: SET_TOGGLE, toggle}
}

export const store = createStore(reducer, applyMiddleware(thunk))
