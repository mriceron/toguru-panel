import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { arrayToObject } from './../utils.es6'

const SET_TOGGLES = 'SET_TOGGLES'
const SET_TOGGLE = 'SET_TOGGLE'
const SET_API_KEY = 'SET_API_KEY'
const DROP_TOGGLE = 'DROP_TOGGLE'
const SET_AUDIT_LOG = 'SET_AUDIT_LOG'
const SET_CONFIG = 'SET_CONFIG'

const API_KEY = 'API_KEY'

const defaultState = {
  config: {},
  toggles: {},
  auditLog: [],
  apiKey: localStorage.getItem(API_KEY)
}

const addToggleToState = (state, toggle) => {
  const toggleObj = {}
  toggleObj[toggle.id] = toggle

  return Object.assign({}, state, {toggles: Object.assign({}, state.toggles, toggleObj)})
}

const removeToggleFromState = (state, toggleId) => {
  const toggles = Object.assign({}, state.toggles)
  delete toggles[toggleId]

  return Object.assign({}, state, {toggles})
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_CONFIG:
      return Object.assign({}, state, {config: action.config})
    case SET_TOGGLES:
      return Object.assign({}, state, {toggles: arrayToObject(action.toggles, "id")})
    case SET_TOGGLE:
      return addToggleToState(state, action.toggle)
    case DROP_TOGGLE:
      return removeToggleFromState(state, action.toggleId)
    case SET_API_KEY:
      localStorage.setItem(API_KEY, action.apiKey)
      return Object.assign({}, state, {apiKey: action.apiKey})
    case SET_AUDIT_LOG:
      return Object.assign({}, state, {auditLog: action.auditLog})
    default:
      return state
  }
}

export const setAuditLog = auditLog => {
  return {type: SET_AUDIT_LOG, auditLog}
}

export const setConfig = config => {
  return {type: SET_CONFIG, config}
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

export const dropToggle = toggleId => {
  return {type: DROP_TOGGLE, toggleId}
}

export const store = createStore(reducer, applyMiddleware(thunk))
